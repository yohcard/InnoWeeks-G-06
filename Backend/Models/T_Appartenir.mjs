const _T_Appartenir = (sequelize, DataTypes) => {
  return sequelize.define(
    "T_Appartenir",
    {
      exeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "T_Exercice",
          key: "exeId",
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
    },
    {
      sequelize,
      tableName: "T_Appartenir",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "exeId" }, { name: "preId" }],
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
export { _T_Appartenir };
