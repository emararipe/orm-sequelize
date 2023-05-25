"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Turmas",
      [
        {
          data_inicio: "2020-02-01",
          nivel_id: 1,
          docente_id: 99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data_inicio: "2020-02-01",
          nivel_id: 2,
          docente_id: 97,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data_inicio: "2020-02-01",
          nivel_id: 3,
          docente_id: 97,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data_inicio: "2020-07-01",
          nivel_id: 3,
          docente_id: 94,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Turmas", null, {})
  },
}
