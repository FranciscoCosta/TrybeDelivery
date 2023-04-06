module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { allowNull: false, type: Sequelize.STRING },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: { allowNull: false, type: Sequelize.STRING },
      address: { allowNull: true, type: Sequelize.STRING },
      door: { allowNull: true, type: Sequelize.STRING },
      role: { allowNull: false, type: Sequelize.STRING },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
