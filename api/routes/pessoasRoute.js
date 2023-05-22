const { Router } = require('express')
const PessoasController = require('../controller/PessoaController.js')

const router = Router()

router.get('/pessoas', PessoasController.pegaTodasAsPessoas)
router.get(`/pessoas/:id`, PessoasController.pegaUmaPessoa)
router.post('/pessoas', PessoasController.criaPessoa)
router.put('/pessoas/:id', PessoasController.atualizaPessoa)
router.delete('/pessoas/:id', PessoasController.deletaPessoa)

module.exports = router