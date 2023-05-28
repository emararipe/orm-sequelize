const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController.js')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get(`/pessoas/:id`, PessoaController.pegaUmaPessoa)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.deletaPessoa)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .put('/pessoas/:id/cancela', PessoaController.cancelaPessoa)

    .get('/pessoas/:estudanteId/matricula/:matriculaId',PessoaController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/matricula',PessoaController.criaMatricula)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletaMatricula)
    .get('/pessoas/:estudanteId/matricula',PessoaController.pegaMatriculas)
    .get('/pessoas/matricula/:turmaId/confirmada',PessoaController.pegaMatriculasPorTurma)
    .get('/pessoas/matricula/lotada',PessoaController.pegaTurmasLotadas)

module.exports = router