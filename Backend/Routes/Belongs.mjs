import { models } from "../Db/sequelize.mjs";
import { auth, AuthAdmin } from "../Auth/auth.mjs";
import { Op } from "sequelize";
import express from "express";
const BelongRouter = express();

BelongRouter.get("/", auth, async (req, res) => {
  try {
    const AllBelong = await models.T_Appartenir.findAll();
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: AllBelong });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

BelongRouter.get("/allprerequis", auth, async (req, res) => {
  const { exeId } = req.body;
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const exepre = await models.T_Appartenir.findAll({
      where: { exeId: Exercise.exeId },
    });
    console.log(exepre);
    if (exepre.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const prerequisIds = await exepre.map((belongs) => belongs.preId);

    const allprerequis = await models.T_Prerequis.findAll({
      where: { preId: prerequisIds },
    });

    console.log(allprerequis);
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: allprerequis });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

BelongRouter.get("/id", async (req, res) => {
  const { preId, exeId } = req.body;
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Belong = await models.T_Appartenir.findOne({
      where: {
        [Op.and]: [{ preId: Prerequisite.preId }, { exeId: Exercise.exeId }],
      },
    });
    console.log(Belong);
    const message = "Exercice effectué: ";
    res.json({ msg: message, data: Belong });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

BelongRouter.post("/", AuthAdmin, async (req, res) => {
  const { preId, exeId } = req.body;
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const BodyData = { preId, exeId };
    const Belong = await models.T_Appartenir.findOne({
      where: {
        [Op.and]: [{ preId: Prerequisite.preId }, { exeId: Exercise.exeId }],
      },
    });
    if (!Belong) {
      const newBelong = await models.T_Appartenir.create(BodyData);
      const message = "Nouvelle liaison effectué créé avec succès";
      return res.json({ msg: message, data: newBelong });
    }
    console.log(Belong);
    const message = "Cette liaison existe déjà";
    res.json({ msg: message, data: Belong });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

BelongRouter.put("/update", AuthAdmin, async (req, res) => {
  const { preId, exeId, newexeId, newpreId } = req.body;
  console.log(exeId);
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }

    let exe;
    if (!newexeId) {
      exe = exeId;
    } else {
      const NewExercise = await models.T_Exercice.findByPk(newexeId);
      if (!NewExercise) {
        const message = "L'id de l'exercice n'existe pas 2";
        return res.status(404).json({ msg: message });
      }
      exe = newexeId;
    }
    console.log("New" + exeId);
    let pre;
    if (!newpreId) {
      pre = preId;
    } else {
      const NewPrerequisite = await models.T_Prerequis.findByPk(newpreId);
      if (!NewPrerequisite) {
        const message = "L'id du prérequis n'existe pas";
        return res.status(404).json({ msg: message });
      }
      pre = newpreId;
    }

    const BodyData = { exeId: exe, preId: pre };
    console.log("Body" + exeId);
    const [UpdateBelong] = await models.T_Appartenir.update(BodyData, {
      where: {
        [Op.and]: [{ preId: Prerequisite.preId }, { exeId: Exercise.exeId }],
      },
    });
    console.log("Update" + exeId);
    if (UpdateBelong === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée à la liaison." });
    }

    const updatedBelong = await models.T_Appartenir.findOne({
      where: {
        [Op.and]: [{ preId: Prerequisite.preId }, { exeId: Exercise.exeId }],
      },
    });

    res.json({
      msg: "La liaison a été mise à jour avec succès",
      data: updatedBelong,
    });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

BelongRouter.delete("/id", AuthAdmin, async (req, res) => {
  const { preId, exeId } = req.body;
  try {
    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const deletebelong = await models.T_Appartenir.destroy({
      where: {
        [Op.and]: [{ preId: Prerequisite.preId }, { exeId: Exercise.exeId }],
      },
    });
    if (deletebelong === 0) {
      const message = "Aucun liaison n'a été supprimé.";
      return res.status(404).json({ msg: message });
    }
    const message = `La liaison a bien été supprimé`;
    return res.json({ msg: message, data: deletebelong });
  } catch (error) {
    const message = "Erreur lors de la mise à jour des données";
    res.status(500).json({ msg: message, data: error });
  }
});

export { BelongRouter };
