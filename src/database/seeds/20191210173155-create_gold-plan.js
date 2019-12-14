module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Gold',
          duration: 3,
          price: 109,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', { title: 'Gold' }, {})
  },
}
