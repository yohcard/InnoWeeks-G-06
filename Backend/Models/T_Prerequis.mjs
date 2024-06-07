import { Sequelize, DataTypes } from "sequelize";
const _T_Prerequis = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Prerequis",
    {
      preId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      preNb_Points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nombre de points ne peut pas être vide",
          },
          notNull: {
            msg: "Le nombre de points est une propriété obligatoire.",
          },
        },
      },
      preMessage_Reussi: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le message de réussi du prérequis ne peut pas être vide",
          },
          notNull: {
            msg: "Le message de réussi du prérequis est une propriété obligatoire.",
          },
          len: {
            args: [0, 50],
            msg: "Le message de réussi du prérequis doit contenir au maximum 60 caractères.",
          },
        },
      },
      preMessage_Rate: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le message d'échec du prérequis ne peut pas être vide",
          },
          notNull: {
            msg: "Le message d'échec du prérequis est une propriété obligatoire.",
          },
          len: {
            args: [0, 50],
            msg: "Le message d'échec du prérequis doit contenir au maximum 60 caractères.",
          },
        },
      },
      preReussi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le preReussi du prérequis ne peut pas être vide",
          },
          notNull: {
            msg: "Le preReussi du prérequis est une propriété obligatoire.",
          },
        },
      },
      preDescription: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "La description du prérequis ne peut pas être vide",
          },
          notNull: {
            msg: "La description du prérequis est une propriété obligatoire.",
          },
          len: {
            args: [0, 150],
            msg: "La description du prérequis doit contenir au maximum 60 caractères.",
          },
        },
      },
      exeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "T_Exercice",
          key: "exeId",
        },
        validate: {
          notEmpty: {
            msg: "Le exeId du prérequis ne peut pas être vide",
          },
          notNull: {
            msg: "Le exeId du prérequis est une propriété obligatoire.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "T_Prerequis",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "preId" }],
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

export { _T_Prerequis };
