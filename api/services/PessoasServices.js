const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
  constructor() {
    super("Pessoas")
    this.matriculas = new Services('Matriculas')
  }

  async pegaTodasAsPessoas(where = {}) {
    return database[this.nomeModelo].scope('todas').findAll({ where: {...where} })
  }

  async pegaRegistrosAtivos(where = {}) {
    return database[this.nomeModelo].findAll({ where: {...where} })
  }

  async cancelaPessoaEMatriculas(id){
    return database.sequelize.transaction(async (t) => {
      await super.atualizaRegistro({ ativo: false }, id, { transaction: t })  
      await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: id }, { transaction: t })
    })
  }

  async pegaMatriculasPorEstudante(where = {}) {
    const matriculas = await database[this.nomeModelo].findOne({ where: {...where} })
    return matriculas.getAulasMatriculadas()
  }

}             
module.exports = PessoasServices
