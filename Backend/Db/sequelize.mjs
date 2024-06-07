import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { initModels } from "../Models/init-models.mjs";

const sequelize = new Sequelize("db_Test_Associate", "root", "root", {
  host: "localhost",
  port: "6033",
  dialect: "mysql",
  logging: false,
});
const models = initModels(sequelize);

//Importation des mocks
import { users } from "./mock-user.mjs";
import { toDos } from "./mock-toDo.mjs";
import { exercises } from "./mock-exercise.mjs";
import { prerequisites } from "./mock-prerequisites.mjs";

const importUsers = async () => {
  for (const user of users) {
    try {
      const hash = await bcrypt.hash(user.utiMdp, 10);
      const createdUser = await models.T_Utilisateur.create({
        utiPrenom: user.utiPrenom,
        utiNom: user.utiNom,
        utiPseudo: user.utiPseudo,
        utiMdp: hash,
        utiAdmin: user.utiAdmin,
        utiPoints: user.utiPoints,
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

const importPrerequisites = async () => {
  for (const prerequisite of prerequisites) {
    try {
      const createPrerequisite = await models.T_Prerequis.create({
        preId: prerequisite.preId,
        preDescription: prerequisite.preDescription,
        preMessage_Rate: prerequisite.preMessage_Rate,
        preMessage_Reussi: prerequisite.preMessage_Reussi,
        preNb_Points: prerequisite.preNb_Points,
        preReussi: prerequisite.preReussi,
        exeId: prerequisite.exeId,
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
    console.log("La base de données a bien été synchronisée:");
  } catch (error) {
    console.error("Erreur lors de l'importation des données:", error);
  }
};

export { sequelize, initDb, models };
