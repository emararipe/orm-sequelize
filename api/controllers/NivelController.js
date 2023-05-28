const { NiveisServices } = require("../services")
const niveisServices = new NiveisServices()

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosRegistros()
      return res.status(200).json(todosOsNiveis)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params

    try {
      const umNivel = await niveisServices.pegaUmRegistro(id)
      return res.status(200).json(umNivel)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body

    try {
      const novoNivelCriado = await niveisServices.criaRegistro(novoNivel)
      return res.status(200).json(novoNivelCriado)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params
    const novosDados = req.body

    try {
      const nivelAtualizado = await niveisServices.atualizaRegistro(novosDados, id)
      return res.status(200).json(nivelAtualizado)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaNivel(req, res) {
    const { id } = req.params

    try {
      await niveisServices.deletaRegistro(id)
      return res.status(200).json({ message: `Id ${Number(id)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async restauraNivel(req, res){
    const { id } = req.params
    
    try {
      await niveisServices.restauraRegistro(id)

      return res.status(200).json({ message: `O id ${id} foi restaurado com sucesso!`})
    } catch(erro){
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = NivelController
