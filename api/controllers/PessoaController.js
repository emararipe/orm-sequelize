const database = require("../models")
const Sequelize = require("sequelize")

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.scope("todas").findAll()
      return res.status(200).json(pessoasAtivas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      })
      return res.status(200).json(umaPessoa)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novosDados = req.body
    try {
      await database.Pessoas.update(novosDados, { where: { id: Number(id) } })
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      })
      return res.status(200).json(pessoaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `Id ${Number(id)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })

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
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      })
      return res.status(200).json(umaMatricula)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
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
      await database.Matriculas.update(novosDados, {
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      })

      const MatriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      })
      return res.status(200).json(MatriculaAtualizada)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async deletaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
      return res
        .status(200)
        .json({ message: `Id ${Number(matriculaId)} deletado.` })
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      })
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
        limit: 20,
        order: [["estudante_id", "ASC"]],
      })

      return res.status(200).json(todasAsMatriculas /*.count*/)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacao = 2
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${lotacao}`),
      })

      return res.status(200).json(turmasLotadas)
    } catch (erro) {
      return res.status(500).json(erro.message)
    }
  }

static async cancelaPessoa(req, res) {
  const { id } = req.params;

  try {
    await database.sequelize.transaction(async (t) => {
      await database.Pessoas.update(
        { ativo: false },
        { where: { id: Number(id) } },
        { transaction: t }
      );

      await database.Matriculas.update(
        { status: "cancelado" },
        { where: { estudante_id: Number(id) } },
        { transaction: t }
      );
    });

    return res
      .status(200)
      .json(`Pessoa de id ${id} foi cancelada com sucesso`);
  } catch (erro) {
    return res.status(500).json(erro.message);
  }
}
}


module.exports = PessoaController
