const Services = require("./Services")
const database = require("../models")
const Sequelize = require('sequelize')

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas")
  }

  
}

module.exports = MatriculasServices
