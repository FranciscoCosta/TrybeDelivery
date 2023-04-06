module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    door: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false,
    } }, {
    underscored: true,
    timestamps: false,
    tableName: 'users',
    });
  return User;
};
