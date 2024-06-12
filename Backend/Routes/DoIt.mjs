import { models } from "../Db/sequelize.mjs";
import { authDoit, AuthAdmin } from "../Auth/auth.mjs";
import { Op } from "sequelize";
import express from "express";
const DoItRouter = express();

DoItRouter.get("/", AuthAdmin, async (req, res) => {
  try {
    const AllDoit = await models.T_Faire.findAll();
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: AllDoit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.get("/alluser", authDoit, async (req, res) => {
  const { utiId } = req.body;
  try {
    const UtilisateurId = await models.T_Utilisateur.findByPk(utiId);
    if (!UtilisateurId) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const userDoit = await models.T_Faire.findAll({
      where: { utiId: UtilisateurId.utiId },
    });
    console.log(userDoit);
    if (userDoit.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const exerciseIds = await userDoit.map((faire) => faire.exeId);

    const allDoit = await models.T_Exercice.findAll({
      where: { exeId: exerciseIds },
    });

    console.log(allDoit);
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: allDoit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

DoItRouter.get("/id", authDoit, async (req, res) => {
  const { utiId, exeId } = req.body;
  try {
    const ExerciseId = await models.T_Exercice.findByPk(exeId);
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const UtilisateurId = await models.T_Utilisateur.findByPk(utiId);
    if (!UtilisateurId) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Doit = await models.T_Faire.findOne({
      where: {
        [Op.and]: [{ utiId: UtilisateurId.utiId }, { exeId: ExerciseId.exeId }],
      },
    });
    console.log(Doit);
    const message = "Exercice effectué: ";
    res.json({ msg: message, data: Doit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.post("/", authDoit, async (req, res) => {
  const { utiId, exeId } = req.body;
  try {
    const ExerciseId = await models.T_Exercice.findByPk(exeId);
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const UtilisateurId = await models.T_Utilisateur.findByPk(utiId);
    if (!UtilisateurId) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const BodyData = { utiId, exeId, faiReussi: false };
    const newDoit = await models.T_Faire.create(BodyData);
    console.log(newDoit);
    const message = "Nouvelle liaison effectué créé avec succès";
    res.json({ msg: message, data: newDoit });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.put("/update", authDoit, async (req, res) => {
  const { utiId, exeId } = req.body;
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const belongs = await models.T_Appartenir.findAll({
      where: { exeId: exeId },
    });

    const allPreReussi = belongs.every((belongs) => belongs.preReussi === true);

    const BodyData = { utiId, exeId, faiReussi: allPreReussi };

    const [UpdateDoit] = await models.T_Faire.update(BodyData, {
      where: {
        [Op.and]: [{ utiId: Utilisateur.utiId }, { exeId: Exercise.exeId }],
      },
    });

    if (UpdateDoit === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée à la liaison." });
    }

    const updatedDoit = await models.T_Faire.findOne({
      where: {
        [Op.and]: [{ utiId: Utilisateur.id }, { exeId: Exercise.id }],
      },
    });

    res.json({
      msg: "La liaison a été mise à jour avec succès",
      data: updatedDoit,
    });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.delete("/id", AuthAdmin, async (req, res) => {
  const { utiId, exeId } = req.body;
  try {
    const ExerciseId = await models.T_Exercice.findByPk(exeId);
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const UtilisateurId = await models.T_Utilisateur.findByPk(utiId);
    if (!UtilisateurId) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const deletedoit = await models.T_Prerequis.destroy({
      where: {
        [Op.and]: [{ utiId: UtilisateurId.utiId }, { exeId: ExerciseId.exeId }],
      },
    });
    if (deletedoit === 0) {
      const message = "Aucun liaison n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }
    const message = `La liaison a bien été supprimé`;
    return res.json({ msg: message, data: deletedoit });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error });
  }
});

export { DoItRouter };
