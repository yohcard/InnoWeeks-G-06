import { Sequelize, DataTypes } from "sequelize";
import { _T_Exercice } from "./T_Exercice.mjs";
import { _T_Faire } from "./T_Faire.mjs";
import { _T_Prerequis } from "./T_Prerequis.mjs";
import { _T_Utilisateur } from "./T_Utilisateur.mjs";
import { _T_Appartenir } from "./T_Appartenir.mjs";
import { _T_Effectue } from "./T_Effectue.mjs";

function initModels(sequelize) {
  const T_Appartenir = _T_Appartenir(sequelize, DataTypes);
  const T_Exercice = _T_Exercice(sequelize, DataTypes);
  const T_Faire = _T_Faire(sequelize, DataTypes);
  const T_Prerequis = _T_Prerequis(sequelize, DataTypes);
  const T_Utilisateur = _T_Utilisateur(sequelize, DataTypes);
  const T_Effectue = _T_Effectue(sequelize, DataTypes);

  T_Exercice.belongsToMany(T_Prerequis, {
    as: "preId_T_Prerequis",
    through: T_Appartenir,
    foreignKey: "exeId",
    otherKey: "preId",
  });
  T_Exercice.belongsToMany(T_Utilisateur, {
    as: "utiId_T_Utilisateur_T_Faires",
    through: T_Faire,
    foreignKey: "exeId",
    otherKey: "utiId",
  });
  T_Prerequis.belongsToMany(T_Exercice, {
    as: "exeId_T_Exercices",
    through: T_Appartenir,
    foreignKey: "preId",
    otherKey: "exeId",
  });
  T_Prerequis.belongsToMany(T_Utilisateur, {
    as: "utiId_T_Utilisateurs",
    through: T_Effectue,
    foreignKey: "preId",
    otherKey: "utiId",
  });
  T_Utilisateur.belongsToMany(T_Exercice, {
    as: "exeId_T_Exercice_T_Faires",
    through: T_Faire,
    foreignKey: "utiId",
    otherKey: "exeId",
  });
  T_Utilisateur.belongsToMany(T_Prerequis, {
    as: "preId_T_Prerequis_T_Effectues",
    through: T_Effectue,
    foreignKey: "utiId",
    otherKey: "preId",
  });
  T_Appartenir.belongsTo(T_Exercice, { as: "exe", foreignKey: "exeId" });
  T_Exercice.hasMany(T_Appartenir, {
    as: "T_Appartenirs",
    foreignKey: "exeId",
  });
  T_Faire.belongsTo(T_Exercice, { as: "exe", foreignKey: "exeId" });
  T_Exercice.hasMany(T_Faire, { as: "T_Faires", foreignKey: "exeId" });
  T_Appartenir.belongsTo(T_Prerequis, { as: "pre", foreignKey: "preId" });
  T_Prerequis.hasMany(T_Appartenir, {
    as: "T_Appartenirs",
    foreignKey: "preId",
  });
  T_Effectue.belongsTo(T_Prerequis, { as: "pre", foreignKey: "preId" });
  T_Prerequis.hasMany(T_Effectue, { as: "T_Effectues", foreignKey: "preId" });
  T_Effectue.belongsTo(T_Utilisateur, { as: "uti", foreignKey: "utiId" });
  T_Utilisateur.hasMany(T_Effectue, { as: "T_Effectues", foreignKey: "utiId" });
  T_Faire.belongsTo(T_Utilisateur, { as: "uti", foreignKey: "utiId" });
  T_Utilisateur.hasMany(T_Faire, { as: "T_Faires", foreignKey: "utiId" });

  return {
    T_Appartenir,
    T_Exercice,
    T_Faire,
    T_Prerequis,
    T_Utilisateur,
    T_Effectue,
  };
}
export { initModels };
