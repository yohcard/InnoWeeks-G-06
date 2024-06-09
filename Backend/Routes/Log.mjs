import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { models } from "../Db/sequelize.mjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { auth } from "../Auth/auth.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const privatekey = process.env.PRIVATE_KEY;

const logRouter = express();

logRouter.post("/", auth, async (req, res) => {
  const user = await models.T_Utilisateur.findOne({
    or: {
      where: { utiPseudo: req.body.utiPseudo },
      where: { utiAdresse_mail: req.body.utiAdresse_mail },
    },
  });

  try {
    if (!user) {
      const message = `L'utilisateur demandé n'existe pas`;
      return res.status(404).json({ msg: message });
    }
    bcrypt.compare(req.body.utiMdp, user.utiMdp).then((isPasswordValid) => {
      if (!isPasswordValid) {
        const message = `Le mot de passe est incorrecte.`;
        return res.status(401).json({ msg: message });
      } else {
        for (let i; i.length <= 6; i++) {
          let character = Math.ceil(Math.random() * 9);
          code += character;
        }
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ msg: message, data: user });
      }
    });
  } catch (error) {
    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
    res.status(500).json({ msg: message, data: error });
  }
});

logRouter.post("/code/code:", auth, async (req, res) => {
  const user = await models.T_Utilisateur.findOne({
    where: { utiPseudo: req.body.utiPseudo },
  });
  try {
    if (!user) {
      const message = `L'utilisateur demandé n'existe pas`;
      return res.status(404).json({ msg: message });
    }
    bcrypt.compare(req.body.utiMdp, user.utiMdp).then((isPasswordValid) => {
      if (!isPasswordValid) {
        const message = `Le mot de passe est incorrecte.`;
        return res.status(401).json({ msg: message });
      } else {
        // JWT
        const token = jwt.sign(
          { userId: user.id, utiAdmin: user.utiAdmin },
          privatekey,
          {
            expiresIn: "1y",
          }
        );
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ msg: message, data: user, token });
      }
    });
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
    res.status(500).json({ message, error });
  }
});
export { logRouter };
