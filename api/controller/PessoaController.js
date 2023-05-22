const database = require('../models')

class PessoasController {
    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }
    static async pegaUmaPessoa(req, res){
        const { id } = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaPessoa(req, res){
        const { id } = req.params
        const novosDados = req.body
        try{
            await database.Pessoas.update(novosDados, { where: { id: Number(id) }})
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) }})
            return res.status(200).json(pessoaAtualizada)

        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

    static async deletaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }})
            return res.status(200).json({message: `Id ${Number(id)} deletado.`})


        } catch(erro){
            return res.status(500).json(erro.message)
        }
    }

}

module.exports = PessoasController