const database = require('../models')

class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo
    }

    async pegaTodosRegistros(where = {}){
        return database[this.nomeModelo].findAll({ where: {...where} })
    }

    async pegaUmRegistro(id){
        return database[this.nomeModelo].findOne({ where: {id: Number(id)} })
    }

    async criaRegistro(dados){
        return database[this.nomeModelo].create(dados) 
    }

    async atualizaRegistro(dadosAt, id, transacao = {}){
        return database[this.nomeModelo].update(dadosAt, { where: {id: Number(id)} }, transacao)
    }

    async atualizaRegistros(dadosAt, where, transacao = {}){
        return database[this.nomeModelo].update(dadosAt, { where: {...where} }, transacao)
    }

    async deletaRegistro(id){
        return database[this.nomeModelo].destroy({ where: { id: Number(id) } })
    } 

    async restauraRegistro(id){
        return database[this.nomeModelo].destroy({ where: { id: Number(id) } })
    }

    async procuraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeModelo].findAndCountAll({
          where: { ...where },...agregadores
        })
      }

}

module.exports = Services