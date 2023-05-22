const express = require('express')
const routes = require('./routes')

const app = express() //inicializando o express, seus métodos serão acessados por app

const porta = 3000

routes(app)

app.listen(porta, () => console.log(`O servidor está rodando na porta ${porta}`)) //aqui estamos pedindo para o express monitorar o servidor e retornar um ação seestiver tudo ok, nesse caso informando a sua porta

module.exports = app