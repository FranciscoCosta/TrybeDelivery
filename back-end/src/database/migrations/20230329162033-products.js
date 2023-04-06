module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      price: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      urlImage: { type: Sequelize.STRING, allowNull: false, field: 'url_image' },
      description: { type: Sequelize.TEXT, allowNull: true },
      volume: { type: Sequelize.STRING, allowNull: true },
      alcoholContent: { type: Sequelize.STRING, allowNull: true, field: 'alcohol_content' },
      idealTemperature: { type: Sequelize.STRING, allowNull: true, field: 'ideal_temperature' },
      style: { type: Sequelize.STRING, allowNull: true },

    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  },
};
