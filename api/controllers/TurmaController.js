const { TurmasServices } = require("../services")
const turmasServices = new TurmasServices()
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query
    const where = {}
    data_inicial || data_final ? (where.data_inicio = {}) : null
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null
    data_final ? (where.data_inicio[Op.lte] = data_final) : null

    try {
      const todasAsTurmas = await turmasServices.pegaTodosRegistros(where)
      return res.status(200).json(todasAsTurmas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    
    try {
      const umaTurma = await turmasServices.pegaUmRegistro(id)
      return res.status(200).json(umaTurma)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body

    try {
      const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novosDados = req.body

    try {
      const turmaAtualizada = await turmasServices.atualizaRegistro(
        novosDados,
        id
      )
      return res.status(200).json(turmaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaTurma(req, res) {
    const { id } = req.params

    try {
      await turmasServices.deletaRegistro(id)
      return res.status(200).json({ message: `Id ${Number(id)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params

    try {
      await turmasServices.restauraRegistro(id)
      return res
        .status(200)
        .json({ message: `O id ${id} foi restaurado com sucesso!` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = TurmaController
