const database = require('../models')

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmNivel(req, res){
        const { id } = req.params
        try{
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umNivel)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async criaNivel(req, res){
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaNivel(req, res){
        const { id } = req.params
        const novosDados = req.body
        try{
            await database.Niveis.update(novosDados, { where: { id: Number(id) }})
            const NivelAtualizado = await database.Niveis.findOne({ where: { id: Number(id) }})
            return res.status(200).json(NivelAtualizado)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    } 

    static async deletaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) }})
            return res.status(200).json({message: `Id ${Number(id)} deletado.`})


        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = NivelController