import { Sequelize, DataTypes } from "sequelize";
const _T_Utilisateur = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Utilisateur",
    {
      utiId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      utiPrenom: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le prénom de l'utilisateur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le prénom de l'utilisateur est une propriété obligatoire.",
          },
          len: {
            args: [0, 35],
            msg: "Le prénom de l'utilisateur doit contenir au maximum 45 caractères.",
          },
        },
      },
      utiNom: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le nom de l'utilisateur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom de l'utilisateur est une propriété obligatoire.",
          },
          len: {
            args: [0, 35],
            msg: "Le nom de l'utilisateur doit contenir au maximum 45 caractères.",
          },
        },
      },
      utiAdresse_Mail: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          msg: "Cette adresse e-mail est déjà utilisée.",
        },
        validate: {
          isEmail: {
            msg: "Veuillez fournir une adresse e-mail valide.",
          },
          notEmpty: {
            msg: "L'adresse e-mail ne peut pas être vide.",
          },
          notNull: {
            msg: "L'adresse e-mail est une propriété obligatoire.",
          },
          len: {
            args: [0, 50],
            msg: "L'adresse e-mail doit contenir au maximum 50 caractères.",
          },
        },
      },
      utiPseudo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          msg: "Ce utiPseudo est déjà utilisé.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9\s]/,
            msg: "Seules les lettres, les chiffres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le nom de l'utilisateur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom de l'utilisateur est une propriété obligatoire.",
          },
          len: {
            args: [0, 35],
            msg: "Le nom de l'utilisateur doit contenir au maximum 45 caractères.",
          },
        },
      },
      utiMdp: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le mot de passe de l'utilisateur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le mot de passe de l'utilisateur est une propriété obligatoire.",
          },
          len: {
            args: [0, 150],
            msg: "Le mot de passe de l'utilisateur doit contenir au maximum 200 caractères.",
          },
        },
      },
      utiAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le rôle admin ne peut pas être vide",
          },
          notNull: {
            msg: "Le rôle admin de points est une propriété obligatoire.",
          },
        },
      },
      utiLogged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le rôle Log ne peut pas être vide",
          },
          notNull: {
            msg: "Le rôle Log de points est une propriété obligatoire.",
          },
        },
      },
      utiPoints: {
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
      utiLogCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Le nombre de points ne peut pas être vide",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "T_Utilisateur",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "utiId" }],
        },
        {
          name: "utiPseudo",
          unique: true,
          using: "BTREE",
          fields: [{ name: "utiPseudo" }],
        },
      ],
    }
  );
};

export { _T_Utilisateur };
