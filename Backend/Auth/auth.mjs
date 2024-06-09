import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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
    if (req.body.utiId && req.body.utiId !== utiId) {
      const message = `L'identifiant de l'utisateur est invalide`;
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

export { auth, AuthAdmin, authUser };
