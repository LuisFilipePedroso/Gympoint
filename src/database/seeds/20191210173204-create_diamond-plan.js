module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Diamond',
          duration: 6,
          price: 89,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', { title: 'Diamond' }, {})
  },
}
