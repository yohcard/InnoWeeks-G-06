import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import { models } from "../Db/sequelize.mjs";
import { auth, authUser } from "../Auth/auth.mjs";
import { Op } from "sequelize";

import mailjet from "node-mailjet";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY2,
  process.env.MAILJET_API_SECRET2
);
const EntrepriseMail = process.env.ENTRENPRISE_MAIL2;

const logRouter = express();
const privatekey = process.env.PRIVATE_KEY;

logRouter.post("/", auth, async (req, res) => {
  const { utiAdresse_Mail, utiMdp } = req.body;
  try {
    const user = await models.T_Utilisateur.findOne({
      where: {
        [Op.or]: [
          { utiPseudo: utiAdresse_Mail },
          { utiAdresse_Mail: utiAdresse_Mail },
        ],
      },
    });

    if (!user) {
      const message = `L'utilisateur demandé n'existe pas`;
      return res.status(404).json({ msg: message });
    }

    const isPasswordValid = await bcrypt.compare(utiMdp, user.utiMdp);

    if (!isPasswordValid) {
      const message = `Le mot de passe est incorrect.`;
      return res.status(401).json({ msg: message });
    } else {
      let code = 0;
      for (let i = 0; i < 6; i++) {
        let character = Math.floor(Math.random() * 10);
        code = code * 10 + character;
      }
      user.utiLogCode = code;
      await user.save();
      const token = jwt.sign(
        {
          utiId: user.utiId,
          utiAdmin: user.utiAdmin,
          utiLogged: user.utiLogged,
        },
        privatekey,
        {
          expiresIn: "1y",
        }
      );
      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ msg: message, data: user, token });
    }
  } catch (error) {
    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
    res.status(500).json({ msg: message, data: error.message });
  }
});

logRouter.post("/in", auth, async (req, res) => {
  const { utiAdresse_Mail, utiMdp } = req.body;

  const user = await models.T_Utilisateur.findOne({
    where: {
      [Op.or]: [
        { utiPseudo: utiAdresse_Mail },
        { utiAdresse_Mail: utiAdresse_Mail },
      ],
    },
  });

  if (!user) {
    const message = `L'utilisateur demandé n'existe pas`;
    return res.status(404).json({ msg: message });
  }

  const isPasswordValid = await bcrypt.compare(utiMdp, user.utiMdp);

  if (!isPasswordValid) {
    const message = `Le mot de passe est incorrect.`;
    return res.status(401).json({ msg: message });
  } else {
    let code = 0;
    for (let i = 0; i < 6; i++) {
      let character = Math.floor(Math.random() * 10);
      code = code * 10 + character;
    }
    user.utiLogCode = code;
    await user.save();

    const subject = "Votre code de connexion";
    const messageSend =
      "Bienvenue sur notre page, voici votre code de connexion: ";

    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: EntrepriseMail,
            Name: "Dario",
          },
          To: [
            {
              Email: user.utiAdresse_Mail,
              Name: user.utiPseudo,
            },
          ],
          Subject: subject,
          TextPart: messageSend + code,
          HTMLPart: messageSend + code,
          CustomID: "CodeUser" + code,
        },
      ],
    });
    try {
      const result = await request;
      console.log(result.body);
      res
        .status(200)
        .json({ message: "Email sent successfully", data: result.body });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  }
});

logRouter.post("/code", auth, async (req, res) => {
  const { utiAdresse_Mail, utiLogCode } = req.body;
  try {
    const user = await models.T_Utilisateur.findOne({
      where: {
        [Op.or]: [
          { utiPseudo: utiAdresse_Mail },
          { utiAdresse_Mail: utiAdresse_Mail },
        ],
      },
    });

    if (!user) {
      const message = `L'utilisateur demandé n'existe pas`;
      return res.status(404).json({ msg: message });
    }
    if (!utiLogCode) {
      const message = `Aucun code fourni`;
      return res.status(400).json({ msg: message });
    }
    const Code = user.utiLogCode;

    if (Code != utiLogCode) {
      const message = `Le code est incorrecte.`;
      return res
        .status(401)
        .json({ msg: message, code: Code, utiLogCode, user: user });
    } else {
      user.utiLogged = true;
      await user.save();
      // JWT
      const token = jwt.sign(
        {
          utiId: user.utiId,
          utiAdmin: user.utiAdmin,
          utiLogged: user.utiLogged,
        },
        privatekey,
        {
          expiresIn: "1y",
        }
      );
      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ msg: message, data: user, token });
    }
  } catch (error) {
    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
    res.status(500).json({ msg: message, data: error.message });
  }
});

logRouter.get("/public-token", async (req, res) => {
  try {
    const payload = {
      type: "public",
    };

    const token = jwt.sign(payload, privatekey, {
      expiresIn: "1d",
    });

    res.json({ data: token });
  } catch (error) {
    const message = "Erreur lors de la création du token";
    res.status(500).json({ msg: message, data: error.message });
  }
});

logRouter.get("/logout", authUser, async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.sendStatus(204);

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, privatekey);
    const utiId = decodedToken.utiId;

    const user = await models.T_Utilisateur.findByPk(utiId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.utiLogged = false;
    await user.save();

    res.status(200).json({ msg: "You are logged out!", data: user.utiLogged });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

export { logRouter };
