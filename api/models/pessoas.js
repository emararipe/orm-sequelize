"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id',
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'cancelado'},
        as: 'AulasMatriculadas'
      })
    }
  }

  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          funcaoValidadora: function(dado){
            if(dado.length < 3) throw Error('O nome deve ter mais de 3 caracteres.')
          }
        }
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email inválido.'
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      defaultScope: { where: { ativo: true } },
      scopes: {
        todas: { where: {} },
        // outros escopos...
      },
      modelName: "Pessoas",
    }
  )
  return Pessoas
}
