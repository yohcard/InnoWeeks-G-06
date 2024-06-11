import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import { models } from "../Db/sequelize.mjs";
import { fileURLToPath } from "url";
import { auth, authUser } from "../Auth/auth.mjs";
import { mailjetClient } from "../Auth/api_key.mjs";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const privatekey = process.env.PRIVATE_KEY;
const EntrepriseMail = process.env.ENTRENPRISE_MAIL;

const logRouter = express();

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

      const subject = "Votre code de connexion";
      const messageSend =
        "Bienvenue sur notre page, voici votre code de connexion: ";
      const userMail = user.utiAdresse_Mail;

      const request = mailjetClient.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: EntrepriseMail,
            },
            To: [
              {
                Email: userMail,
              },
            ],
            Subject: subject,
            TextPart: messageSend + code,
            HTMLPart: `<p>${messageSend + code}</p>`,
            CustomID: "AppGettingStartedTest",
          },
        ],
      });
      user.utiLogCode = code;
      await user.save();

      const result = await request;
      res
        .status(200)
        .json({ message: "Email sent successfully", data: result.body });
    }
  } catch (error) {
    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
    res.status(500).json({ msg: message, data: error });
  }
});

logRouter.post("/code", auth, async (req, res) => {
  try {
    const user = await models.T_Utilisateur.findOne({
      where: {
        [models.Sequelize.Op.or]: [
          { utiPseudo: utiPseudo },
          { utiAdresse_Mail: utiAdresse_mail },
        ],
      },
    });

    const { utiLogCode } = req.body;
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
      return res.status(401).json({ msg: message });
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
    res.status(500).json({ msg: message, data: error });
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

    res.json({ token });
  } catch (error) {
    const message = "Erreur lors de la création du token";
    res.status(500).json({ msg: message, data: error });
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
      return res.status(404).json({ message: "User not found" });
    }

    user.utiLogged = false;
    await user.save();

    res.status(200).json({ message: "You are logged out!" });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

export { logRouter };
