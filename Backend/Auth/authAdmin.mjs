import jwt from "jsonwebtoken";
import { privatekey } from "./private_key.mjs";

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

export { AuthAdmin };
