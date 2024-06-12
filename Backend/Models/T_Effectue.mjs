const _T_Effectue = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Effectue",
    {
      utiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "T_Utilisateur",
          key: "utiId",
        },
      },
      preId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "T_Prerequis",
          key: "preId",
        },
      },
      effReussi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "T_Effectue",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "utiId" }, { name: "preId" }],
        },
        {
          name: "preId",
          using: "BTREE",
          fields: [{ name: "preId" }],
        },
      ],
    }
  );
};

export { _T_Effectue };
