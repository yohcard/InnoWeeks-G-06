import { models } from "../Db/sequelize.mjs";
import { auth, AuthAdmin } from "../Auth/auth.mjs";
import express from "express";
import { Op } from "sequelize";

const PrerequisitesRouter = express();

PrerequisitesRouter.get("/", auth, async (req, res) => {
  try {
    const AllPrerequisites = await models.T_Prerequis.findAll();
    const message = "La liste des prérequis: ";
    res.json({ msg: message, data: AllPrerequisites });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

PrerequisitesRouter.get("/:id", auth, async (req, res) => {
  const PrerequisiteId = req.params.id;
  try {
    if (!PrerequisiteId) {
      const message =
        "L'id du prérequis n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ msg: message });
    }
    const Prerequisite = await models.T_Prerequis.findByPk(PrerequisiteId);
    const message = "Prérequis: ";
    res.json({ msg: message, data: Prerequisite });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

PrerequisitesRouter.get("/title/:title", auth, async (req, res) => {
  const Pretitle = req.params.title;
  try {
    const getPrerequisites = await models.T_Prerequis.findAll({
      where: {
        Pretitle: {
          [Op.like]: `${Pretitle}%`,
        },
      },
    });
    if (getPrerequisites.length === 0) {
      const message = `Aucun exercice trouvé avec le titre commençant par '${Pretitle}'`;
      return res.status(404).json({ msg: message });
    }

    const message = `Les exercices dont le titre commence par '${Pretitle}' ont bien été récupérés`;
    res.json({ msg: message, data: getPrerequisites });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

PrerequisitesRouter.post("/", AuthAdmin, async (req, res) => {
  const {
    pretitle,
    preDescription,
    preNb_Points,
    preMessage_Reussi,
    preMessage_Rate,
    preReussi,
    exeId,
  } = req.body;
  try {
    const ExerciseId = await models.T_Exercice.findByPk(exeId);
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const BodyData = {
      pretitle,
      preDescription,
      preNb_Points,
      preMessage_Reussi,
      preMessage_Rate,
      preReussi,
      exeId,
    };
    const newPrerequisite = await models.T_Prerequis.create(BodyData);
    const message = "Nouveau prérequis créé avec succès";
    res.json({ msg: message, data: newPrerequisite });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

PrerequisitesRouter.put("/:id", AuthAdmin, async (req, res) => {
  const PrerequisiteId = req.params.id;
  const {
    pretitle,
    preDescription,
    preNb_Points,
    preMessage_Reussi,
    preMessage_Rate,
    preReussi,
    exeId,
  } = req.body;
  try {
    if (!PrerequisiteId) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const ExerciseId = await models.T_Exercice.findByPk(exeId);
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const BodyData = {
      pretitle,
      preDescription,
      preNb_Points,
      preMessage_Reussi,
      preMessage_Rate,
      preReussi,
      exeId,
    };

    const [UpdatePrerequisite] = await models.T_Prerequis.update(BodyData, {
      where: { preId: PrerequisiteId },
    });
    if (UpdatePrerequisite === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée au prérequis." });
    }

    const updatedPrerequisite = await models.T_Exercice.findByPk(
      PrerequisiteId
    );
    res.json({
      msg: "Le prérequis a été mis à jour avec succès",
      data: updatedPrerequisite,
    });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error });
  }
});

PrerequisitesRouter.delete("/:id", AuthAdmin, async (req, res) => {
  const PrerequisiteId = req.params.id;
  try {
    if (!PrerequisiteId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const deletePrerequisite = await models.T_Prerequis.destroy({
      where: { preId: deletePrerequisite },
    });
    if (deletePrerequisite === 0) {
      const message = "Aucun prérequis n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }
    const message = `Le prérequis ${ExerciseId} a bien été supprimé`;
    return res.json({ msg: message, data: { id: ExerciseId } });
  } catch (error) {
    const message = "Erreur lors de la suppression du prérequis";
    res.status(500).json({ msg: message, data: error });
  }
});

export { PrerequisitesRouter };
