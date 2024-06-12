import { models } from "../Db/sequelize.mjs";
import { auth, authEffect, AuthAdmin } from "../Auth/auth.mjs";
import { Op } from "sequelize";
import express from "express";
const EffectRouter = express();

EffectRouter.get("/", AuthAdmin, async (req, res) => {
  try {
    const AllEffect = await models.T_Effectue.findAll();
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: AllEffect });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error });
  }
});

EffectRouter.get("/alluser", AuthAdmin, async (req, res) => {
  const { preId } = req.body;
  try {
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id de l'exercise n'existe pas";
      return res.status(404).json({ msg: message });
    }
    console.log(Prerequisite);
    const userPrerequis = await models.T_Effectue.findAll({
      where: { preId: Prerequisite.preId },
    });
    console.log(userPrerequis);
    if (userPrerequis.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const usersIds = await userPrerequis.map((faire) => faire.utiId);

    const Allusers = await models.T_Utilisateur.findAll({
      where: { utiId: usersIds },
    });

    console.log(Allusers);
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: Allusers });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

EffectRouter.get("/allprerequis", authEffect, async (req, res) => {
  const { utiId } = req.body;
  try {
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const prerequisDoit = await models.T_Effectue.findAll({
      where: { utiId: Utilisateur.utiId },
    });
    console.log(prerequisDoit);
    if (prerequisDoit.length === 0) {
      const message = `Aucune liaison trouvé.`;
      return res.status(200).json({ msg: message });
    }
    const prerequisiteIds = await prerequisDoit.map((faire) => faire.utiId);

    const allDoit = await models.T_Prerequis.findAll({
      where: { preId: prerequisiteIds },
    });

    console.log(allDoit);
    const message = "La liste des liaisons: ";
    res.json({ msg: message, data: allDoit });
  } catch (error) {
    const message = "Erreur lors de la récuperation des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

EffectRouter.get("/id", authEffect, async (req, res) => {
  const { utiId, exeId } = req.body;
  try {
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const Exercise = await models.T_Exercice.findByPk(exeId);
    if (!Exercise) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const prerequis = await models.T_Appartenir.findAll({
      where: { exeId: exeId },
    });

    if (prerequis.length === 0) {
      const message = "Aucun prérequis trouvé pour cet exercice.";
      return res.status(200).json({ msg: message });
    }

    const prerequisIds = prerequis.map((p) => p.preId);

    const effects = await models.T_Effectue.findAll({
      where: {
        utiId: utiId,
        preId: {
          [Op.in]: prerequisIds,
        },
      },
    });

    const completedMap = effects.reduce((map, effect) => {
      map[effect.preId] = effect.effReussi;
      return map;
    }, {});

    const message = `Liste des prérequis pour l'exercice: ${exeId}`;
    res.json({ msg: message, data: completedMap });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error.message });
  }
});

EffectRouter.post("/", authEffect, async (req, res) => {
  const { utiId, preId } = req.body;
  try {
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id du prérequis n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const BodyData = { utiId, preId, effReussi: false };
    const newEffect = await models.T_Faire.findOrCreate(BodyData);
    console.log(newEffect);
    const message = "Nouvelle liaison effectué créé avec succès";
    res.json({ msg: message, data: newEffect });
  } catch (error) {
    const message = "Erreur lors de la récupération des données";
    res.status(500).json({ msg: message, data: error });
  }
});

EffectRouter.put("/update", authEffect, async (req, res) => {
  const { utiId, preId, effReussi } = req.body;
  try {
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }

    const BodyData = { utiId, exeId, effReussi };

    const [UpdateDoit] = await models.T_Faire.update(BodyData, {
      where: {
        [Op.and]: [{ utiId: Utilisateur.utiId }, { preId: Prerequisite.preId }],
      },
    });

    if (UpdateDoit === 0) {
      return res
        .status(404)
        .json({ msg: "Aucune modification n'a été apportée à la liaison." });
    }

    const updatedDoit = await models.T_Faire.findOne({
      where: {
        [Op.and]: [{ utiId: Utilisateur.utiId }, { preId: Prerequisite.preId }],
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

EffectRouter.delete("/id", AuthAdmin, async (req, res) => {
  const { utiId, preId } = req.body;
  try {
    const Prerequisite = await models.T_Prerequis.findByPk(preId);
    if (!Prerequisite) {
      const message = "L'id de l'exercice n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const Utilisateur = await models.T_Utilisateur.findByPk(utiId);
    if (!Utilisateur) {
      const message = "L'id de l'utilisateur n'existe pas";
      return res.status(404).json({ msg: message });
    }
    const deletedoit = await models.T_Prerequis.destroy({
      where: {
        [Op.and]: [{ utiId: Utilisateur.utiId }, { preId: Prerequisite.preId }],
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

export { EffectRouter };
