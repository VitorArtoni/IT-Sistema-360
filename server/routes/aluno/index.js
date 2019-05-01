'use strict'

const express = require('express');

const controller = require('./aluno.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/:ra', controller.buscarAluno);
    router.post('/', controller.cadastrarAluno);
    router.post('/turma', controller.atribuirAlunoATurma);

    return router;
}