import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { models } from "../Db/sequelize.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const privatekey = process.env.PRIVATE_KEY;

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privatekey);
    const utiId = decodedToken.utiId;

    if (decodedToken.type !== "public" || req.body.utiId !== utiId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message });
    }

    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
    return res.status(401).json({ message, data: error });
  }
};

const authUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez par fourni de jeton d'authentification. Ajoutez-en un dnas l'en tête de la requête.`;
    return res.status(401).json({ message });
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privatekey);
    const utiId = decodedToken.utiId;
    const user = await models.T_Utilisateur.findByPk(utiId);
    const isAdmin = decodedToken.utiAdmin;
    if ((!isAdmin && user.utiId !== utiId) || decodedToken.type == "public") {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message });
    }

    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette resource.`;
    return res.status(401).json({ message, data: error });
  }
};

const authDoit = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez par fourni de jeton d'authentification. Ajoutez-en un dnas l'en tête de la requête.`;
    return res.status(401).json({ message });
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privatekey);
    const utiId = decodedToken.utiId;
    const doit = await models.T_Faire.findByPk(utiId);
    if (!doit) {
      const message = `L'utilisateur n'a pas commencé l'exercice.`;
      return res.status(401).json({ message });
    }
    const isAdmin = decodedToken.utiAdmin;
    const id = req.body.utiId;
    console.log(id);
    console.log("token " + utiId);
    if ((!isAdmin && id !== utiId) || decodedToken.type == "public") {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message });
    }

    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette resource.`;
    return res.status(401).json({ message, data: error });
  }
};

const AuthAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez par fourni de jeton d'authentification. Ajoutez-en un dnas l'en tête de la requête.`;
    return res.status(401).json({ msg: message });
  }
  const token = authorizationHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, privatekey);
    const isAdmin = decodedToken.utiAdmin;

    //Vérifie si l'utilisateur est admin
    if (!isAdmin) {
      const message = `L'accès est restreint aux administrateurs uniquement.`;
      return res.status(403).json({ message });
    }
    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
    return res.status(401).json({ message, data: error });
  }
};

export { auth, AuthAdmin, authUser, authDoit };
