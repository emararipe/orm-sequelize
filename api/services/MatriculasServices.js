const Services = require("./Services")
const database = require("../models")
const Sequelize = require('sequelize')

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas")
  }

  async pegaTurmasLotadas(lotacao) {
    return database[this.nomeModelo].findAndCountAll({
      where: {
        status: "confirmado",
      },
      attributes: ["turma_id"],
      group: ["turma_id"],
      having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
    })
  }
}

module.exports = MatriculasServices
