import { models } from "../Db/sequelize.mjs";
import { AuthAdmin } from "../Auth/authAdmin.mjs";
import express from "express";

const UsersRouter = express();

//GET pour acceder a tous les users
UsersRouter.get("/", AuthAdmin, async (req, res) => {
  const users = await models.T_Utilisateur.findAll();
  try {
    const message = "La liste des utilisateurs a bien été récupérée.";
    res.json({ msg: message, data: users });
  } catch (error) {
    const message =
      "La liste des utilisateurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

//GET pour acceder a un utilisateur en particulier depuis son id
UsersRouter.get("/:id", AuthAdmin, async (req, res) => {
  const userId = req.params.id;
  const user = await models.T_Utilisateur.findByPk(userId);
  try {
    if (!user) {
      const message =
        "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const message = `L'utilisateur dont l'id est ${userId} a été bien récuperé`;
    res.json({ msg: message, data: user });
  } catch (error) {
    // Message d'erreur
    const message =
      "L'utilisateur n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ msg: message, data: error });
  }
});

export { UsersRouter };
