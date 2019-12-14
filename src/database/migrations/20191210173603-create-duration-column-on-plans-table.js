module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'duration', { type: Sequelize.INTEGER })
  },

  down: queryInterface => queryInterface.removeColumn('plans', 'duration'),
}
