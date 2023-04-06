module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), unique: true },
      price: { type: DataTypes.DECIMAL(4, 2) },
      urlImage: { type: DataTypes.STRING(200) },
      description: { type: DataTypes.TEXT(200000) },
      volume: { type: DataTypes.STRING(100) },
      alcoholContent: { type: DataTypes.STRING(100) },
      idealTemperature: { type: DataTypes.STRING(100) },
      style: { type: DataTypes.STRING(100) },

    }, {
        timestamps: false,
        underscored: true,
        tableName: 'products',
    });

    return Product;
  };
