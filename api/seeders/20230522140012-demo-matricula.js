"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Matriculas",
      [
        {
          status: "confirmado",
          estudante_id: 92,
          turma_id: 54,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudante_id: 93,
          turma_id: 54,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudante_id: 94,
          turma_id: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudante_id: 95,
          turma_id: 56,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "cancelado",
          estudante_id: 92,
          turma_id: 54,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "cancelado",
          estudante_id: 93,
          turma_id: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Matriculas", null, {})
  },
}
