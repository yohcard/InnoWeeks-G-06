import { Sequelize, DataTypes } from "sequelize";

const _T_Faire = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Faire",
    {
      utiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "T_Utilisateur",
          key: "utiId",
        },
        validate: {
          notEmpty: {
            msg: "Le utiId de la table Faire ne peut pas être vide",
          },
          notNull: {
            msg: "Le utiId de la table Faire est une propriété obligatoire.",
          },
        },
      },
      exeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "T_Exercice",
          key: "exeId",
        },
        validate: {
          notEmpty: {
            msg: "Le exeId de la table Faire ne peut pas être vide",
          },
          notNull: {
            msg: "Le exeId de la table Faire est une propriété obligatoire.",
          },
        },
      },
      faiReussi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le faiReussi de la table Faire ne peut pas être vide",
          },
          notNull: {
            msg: "Le faiReussi de la table Faire est une propriété obligatoire.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "T_Faire",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "utiId" }, { name: "exeId" }],
        },
        {
          name: "exeId",
          using: "BTREE",
          fields: [{ name: "exeId" }],
        },
      ],
    }
  );
};

export { _T_Faire };
