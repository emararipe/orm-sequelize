const { PessoasServices, MatriculasServices } = require("../services")
const pessoasServices = new PessoasServices()
const matriculasServices = new MatriculasServices()

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaTodasAsPessoas()
      return res.status(200).json(pessoasAtivas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaPessoasAtivas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos()
      return res.status(200).json(todasAsPessoas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params

    try {
      const umaPessoa = await pessoasServices.pegaUmRegistro(id)
      return res.status(200).json(umaPessoa)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body

    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novosDados = req.body

    try {
      await pessoasServices.atualizaRegistro(novosDados, id)
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id)
      return res.status(200).json(pessoaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaPessoa(req, res) {
    const { id } = req.params

    try {
      await pessoasServices.deletaRegistro(id)
      return res.status(200).json({ message: `Id ${Number(id)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params

    try {
      await pessoasServices.restauraRegistro(id)
      return res
        .status(200)
        .json({ message: `O id ${id} foi restaurado com sucesso!` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params

    try {
      const umaMatricula = await matriculasServices.pegaUmRegistro(matriculaId)
      return res.status(200).json(umaMatricula)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }

    try {
      const novaMatriculaCriada = await matriculasServices.criaRegistro(
        novaMatricula
      )
      return res.status(200).json(novaMatriculaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novosDados = req.body

    try {
      await matriculasServices.atualizaRegistro(novosDados, matriculaId)
      const matriculaAtualizada = await matriculasServices.pegaUmRegistro(
        matriculaId
      )
      return res.status(200).json(matriculaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params

    try {
      await matriculasServices.deletaRegistro(matriculaId)
      return res.status(200).json({ message: `Id ${matriculaId} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params

    try {
      const matriculas = await pessoasServices.pegaMatriculasPorEstudante({ id: Number(estudanteId) })
      return res.status(200).json(matriculas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params

    try {
      const todasAsMatriculas = await matriculasServices.procuraEContaRegistros(
        { turma_id: Number(turmaId),
          status: "confirmado"
        },
        { limit: 20,
          order: [["estudante_id", "ASC"]]
        }  
      )
      return res.status(200).json(todasAsMatriculas /*.count*/)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacao = 2

    try {
      const turmasLotadas = await matriculasServices.procuraEContaRegistros(
        {
          status: "confirmado"
        },
        {
          attributes: ["turma_id"],
          group: ["turma_id"],
          having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
        }
      )
      return res.status(200).json(turmasLotadas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async cancelaPessoa(req, res) {
    const { id } = req.params

    try {
      await pessoasServices.cancelaPessoaEMatriculas(id)
      return res
        .status(200)
        .json(`Pessoa de id ${id} foi cancelada com sucesso`)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }
}

module.exports = PessoaController
