import jwt from "jsonwebtoken";
import { privatekey } from "./private_key.mjs";

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez par fourni de jeton d'authentification. Ajoutez-en un dnas l'en tête de la requête.`;
    return res.status(401).json({ message });
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privatekey);

    if (decodedToken.type === "public") {
      return next();
    }
    const utiId = decodedToken.utiId;
    if (req.body.utiId && req.body.utiId !== utiId) {
      const message = `L'identifiant de l'utisateur est invalide`;
      return res.status(401).json({ message });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette resource.`;
    return res.status(401).json({ message, data: error });
  }
};

export { auth };
