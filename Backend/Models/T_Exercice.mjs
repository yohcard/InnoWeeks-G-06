import { Sequelize, DataTypes } from "sequelize";

const _T_Exercice = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Exercice",
    {
      exeId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      exeTitre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          msg: "Ce titre est déjà utilisé.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le titre de l'exercice ne peut pas être vide",
          },
          notNull: {
            msg: "Le titre de l'exercice est une propriété obligatoire.",
          },
          len: {
            args: [0, 50],
            msg: "La titre de l'exercice doit contenir au maximum 60 caractères.",
          },
        },
      },
      exeDescription: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: {
          msg: "Cette description est déjà utilisé.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "La description de l'exercice ne peut pas être vide",
          },
          notNull: {
            msg: "La description de l'exercice est une propriété obligatoire.",
          },
          len: {
            args: [0, 150],
            msg: "La description de l'exercice doit contenir au maximum 60 caractères.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "T_Exercice",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "exeId" }],
        },
      ],
    }
  );
};

export { _T_Exercice };
