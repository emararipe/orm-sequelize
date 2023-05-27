"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Pessoas", {
      fields: ["email"],
      type: "unique",
      options: {
        customIndex: true,
        indexName: "unique_email_index",
        errorMsg: "Email já cadastrado.",
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Pessoas')
  },
}
