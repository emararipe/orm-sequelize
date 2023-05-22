const database = require("../models")

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    try {
      const todasAsTurmas = await database.Turmas.findAll()
      return res.status(200).json(todasAsTurmas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await database.Turmas.findOne({
        where: {
          id: Number(id),
        },
      })
      return res.status(200).json(umaTurma)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novosDados = req.body
    try {
      await database.Turmas.update(novosDados, { where: { id: Number(id) } })
      const TurmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      })
      return res.status(200).json(TurmaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaTurma(req, res) {
    const { id } = req.params
    try {
      await database.Turmas.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `Id ${Number(id)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = TurmaController
