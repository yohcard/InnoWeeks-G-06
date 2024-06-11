import { models } from "../Db/sequelize.mjs";
import { authUser, AuthAdmin } from "../Auth/auth.mjs";
import { Op } from "sequelize";
const DoItRouter = express();

DoItRouter.get("/", authUser, async (req, res) => {
  try {
    const AllDoit = await models.T_Faire.findAll();
    const message = "La liste des exercices éffectués: ";
    res.json({ msg: message, data: AllDoit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.get("/id", authUser, async (req, res) => {
  const { exeId, utiId } = req.body;
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
        [Op.and]: [{ utiId: UtilisateurId }, { exeId: ExerciseId }],
      },
    });
    const message = "Exercice éffectué: ";
    res.json({ msg: message, data: Doit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.post("/", authUser, async (req, res) => {
  const { utiId, exeId, faiReussi } = req.body;
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
    const BodyData = { utiId, exeId, faiReussi };
    const newDoit = await models.T_Faire.create(BodyData);
    const message = "Nouveau prérequis créé avec succès";
    res.json({ msg: message, data: newDoit });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

DoItRouter.put("/update", AuthAdmin, async (req, res) => {
  const { utiId, exeId, faiReussi } = req.body;
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

    const BodyData = { utiId, exeId, faiReussi };

    const [UpdateDoit] = await models.T_Faire.update(BodyData, {
      where: {
        [Op.and]: [{ utiId: UtilisateurId }, { exeId: ExerciseId }],
      },
    });
    if (UpdateDoit === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée au prérequis." });
    }

    const updatedDoit = await models.T_Faire.findOne({
      where: {
        [Op.and]: [{ utiId: UtilisateurId }, { exeId: ExerciseId }],
      },
    });
    res.json({
      msg: "Le prérequis a été mis à jour avec succès",
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
        [Op.and]: [{ utiId: UtilisateurId }, { exeId: ExerciseId }],
      },
    });
    if (deletedoit === 0) {
      const message = "Aucun prérequis n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }
    const message = `L'exercice éffectué a bien été supprimé`;
    return res.json({ msg: message, data: deletedoit });
  } catch (error) {
    const message = "Erreur lors de la suppression du prérequis";
    res.status(500).json({ msg: message, data: error });
  }
});

export { DoItRouter };
