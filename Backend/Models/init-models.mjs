import { Sequelize, DataTypes } from "sequelize";
import { _T_Exercice } from "./T_Exercice.mjs";
import { _T_Faire } from "./T_Faire.mjs";
import { _T_Prerequis } from "./T_Prerequis.mjs";
import { _T_Utilisateur } from "./T_Utilisateur.mjs";

function initModels(sequelize) {
  const T_Exercice = _T_Exercice(sequelize, DataTypes);
  const T_Faire = _T_Faire(sequelize, DataTypes);
  const T_Prerequis = _T_Prerequis(sequelize, DataTypes);
  const T_Utilisateur = _T_Utilisateur(sequelize, DataTypes);

  T_Exercice.belongsToMany(T_Utilisateur, {
    as: "utiId_T_Utilisateurs",
    through: T_Faire,
    foreignKey: "exeId",
    otherKey: "utiId",
  });
  T_Utilisateur.belongsToMany(T_Exercice, {
    as: "exeId_T_Exercices",
    through: T_Faire,
    foreignKey: "utiId",
    otherKey: "exeId",
  });
  T_Faire.belongsTo(T_Exercice, { as: "exe", foreignKey: "exeId" });
  T_Exercice.hasMany(T_Faire, { as: "T_Faires", foreignKey: "exeId" });
  T_Prerequis.belongsTo(T_Exercice, { as: "exe", foreignKey: "exeId" });
  T_Exercice.hasMany(T_Prerequis, { as: "T_Prerequis", foreignKey: "exeId" });
  T_Faire.belongsTo(T_Utilisateur, { as: "uti", foreignKey: "utiId" });
  T_Utilisateur.hasMany(T_Faire, { as: "T_Faires", foreignKey: "utiId" });

  return {
    T_Exercice,
    T_Faire,
    T_Prerequis,
    T_Utilisateur,
  };
}
export { initModels };
