import { Op } from "sequelize";
import { models } from "../Db/sequelize.mjs";
import { auth, AuthAdmin } from "../Auth/auth.mjs";

import express from "express";

const ExerciseRouter = express();

ExerciseRouter.get("/", auth, async (req, res) => {
  try {
    const getAllExercises = await models.T_Exercice.findAll();
    const message = "La liste des exercices: ";
    res.json({ msg: message, data: getAllExercises });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

ExerciseRouter.get("/:id", auth, async (req, res) => {
  const ExerciseId = req.params.id;
  try {
    if (!ExerciseId) {
      const message =
        "L'id de l'exercice n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ msg: message });
    }
    const getExercise = await models.T_Exercice.findByPk(ExerciseId);
    const message = "Exercice trouvé: ";
    res.status(200).json({ msg: message, data: getExercise });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

ExerciseRouter.get("/title/:title", auth, async (req, res) => {
  const Exetitle = req.params.title;
  try {
    const getExercises = await models.T_Exercice.findAll({
      where: {
        exeTitre: {
          [Op.like]: `${Exetitle}%`,
        },
      },
    });
    if (getExercises.length === 0) {
      const message = `Aucun exercice trouvé avec le titre commençant par '${Exetitle}'`;
      return res.status(404).json({ msg: message });
    }

    const message = `Les exercices dont le titre commence par '${Exetitle}' ont bien été récupérés`;
    res.json({ msg: message, data: getExercises });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

ExerciseRouter.post("/", AuthAdmin, async (req, res) => {
  const { exeTitre, exeDescription } = req.body;
  try {
    const BodyData = {
      exeTitre,
      exeDescription,
    };
    const newExercise = await models.T_Exercice.create(BodyData);
    const message = "Nouvel exercice créé avec succès";
    res.json({ msg: message, data: newExercise });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

ExerciseRouter.put("/:id", AuthAdmin, async (req, res) => {
  const ExerciseId = req.params.id;
  const { exeTitre, exeDescription } = req.body;
  try {
    if (!ExerciseId) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const BodyData = {
      exeTitre,
      exeDescription,
    };

    const [UpdateExercice] = await models.T_Exercice.update(BodyData, {
      where: { exeId: ExerciseId },
    });
    if (UpdateExercice === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée à l'exercice." });
    }

    const updatedExercise = await models.T_Exercice.findByPk(ExerciseId);
    res.json({
      msg: "L'exercice a été mis à jour avec succès",
      data: updatedExercise,
    });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error });
  }
});

ExerciseRouter.delete("/:id", AuthAdmin, async (req, res) => {
  const ExerciseId = req.params.id;
  try {
    const Exercise = await models.T_Exercice.findByPk(ExerciseId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const exeDoit = await models.T_Faire.findAll({
      where: { exeId: Exercise.exeId },
    });
    console.log(exeDoit);
    if (exeDoit.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const exerciseIds = await exeDoit.map((faire) => faire.exeId);

    const deleteExercises = await models.T_Faire.destroy({
      where: { exeId: exerciseIds },
    });
    if (deleteExercises.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const deleteExercise = await models.T_Exercice.destroy({
      where: { exeId: ExerciseId },
    });
    if (deleteExercise === 0) {
      const message = "Aucun exercice n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }
    const message = `L'exercice ${ExerciseId} a bien été supprimé`;
    return res.json({ msg: message, data: { id: ExerciseId } });
  } catch (error) {
    const message = "Erreur lors de la suppression de l'exercice";
    res.status(500).json({ msg: message, data: error });
  }
});

export { ExerciseRouter };
