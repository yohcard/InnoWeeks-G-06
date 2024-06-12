import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { initModels } from "../Models/init-models.mjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  }
);
const models = initModels(sequelize);

//Importation des mocks
import { users } from "./mock-user.mjs";
import { toDos } from "./mock-toDo.mjs";
import { exercises } from "./mock-exercise.mjs";
import { prerequisites } from "./mock-prerequisites.mjs";
import { belongs } from "./mock-belong.mjs";
import { effects } from "./mock-effect.mjs";

const importUsers = async () => {
  for (const user of users) {
    try {
      const hash = await bcrypt.hash(user.utiMdp, 10);
      const createdUser = await models.T_Utilisateur.create({
        utiPrenom: user.utiPrenom,
        utiNom: user.utiNom,
        utiAdresse_Mail: user.utiAdresse_Mail,
        utiPseudo: user.utiPseudo,
        utiMdp: hash,
        utiAdmin: user.utiAdmin,
        utiLogged: user.utiLogged,
        utiPoints: user.utiPoints,
        utiLogCode: user.utiLogCode,
      });
      console.log("Utilisateur créé:", createdUser.toJSON());
    } catch (error) {
      console.error("Problème lors de la création de l'utilisateur:", error);
    }
  }
};

const importToDos = async () => {
  for (const todo of toDos) {
    try {
      const createToDo = await models.T_Faire.create({
        exeId: todo.exeId,
        utiId: todo.utiId,
        faiReussi: todo.faiReussi,
      });
      console.log(
        "Création de rélation entre exercice et utilisateurs: ",
        createToDo.toJSON()
      );
    } catch (error) {
      console.error(
        "Erreur lors de la création de la rélation entre exercices et utilisateurs:",
        error
      );
    }
  }
};
const importExercises = async () => {
  for (const exercise of exercises) {
    try {
      const createExercise = await models.T_Exercice.create({
        exeTitre: exercise.exeTitre,
        exeDescription: exercise.exeDescription,
      });

      console.log("Exercice créé: ", createExercise.toJSON());
    } catch (error) {
      console.error("Erreur lors de la création de l'exercice", error);
    }
  }
};

const importBelongs = async () => {
  for (const belong of belongs) {
    try {
      const createBelong = await models.T_Appartenir.create({
        exeId: belong.exeId,
        preId: belong.preId,
      });
      console.log(
        "Création de rélation entre exercices et prérequis: ",
        createBelong.toJSON()
      );
    } catch (error) {
      console.error(
        "Erreur lors de la création de la rélation entre exercices et prérequis:",
        error
      );
    }
  }
};

const importEffects = async () => {
  for (const effect of effects) {
    try {
      const createEffect = await models.T_Effectue.create({
        utiId: effect.utiId,
        preId: effect.preId,
        effReussi: effect.effReussi,
      });
      console.log(
        "Création de rélation entre utilisateurs et prérequis: ",
        createEffect.toJSON()
      );
    } catch (error) {
      console.error(
        "Erreur lors de la création de la rélation entre utilisateurs et prérequis:",
        error
      );
    }
  }
};

const importPrerequisites = async () => {
  for (const prerequisite of prerequisites) {
    try {
      const createPrerequisite = await models.T_Prerequis.create({
        preId: prerequisite.preId,
        preTitre: prerequisite.preTitre,
        preDescription: prerequisite.preDescription,
        preMessage_Rate: prerequisite.preMessage_Rate,
        preMessage_Reussi: prerequisite.preMessage_Reussi,
        preNb_Points: prerequisite.preNb_Points,
      });
      console.log("Prérequis créé: ", createPrerequisite.toJSON());
    } catch (error) {
      console.error("Erreur lors de la création du prérequis: ", error);
    }
  }
};
let initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    await importUsers();
    await importExercises();
    await importToDos();
    await importPrerequisites();
    await importBelongs();
    await importEffects();
    console.log("La base de données a bien été synchronisée:");
  } catch (error) {
    console.error("Erreur lors de l'importation des données:", error);
  }
};

export { sequelize, initDb, models };
