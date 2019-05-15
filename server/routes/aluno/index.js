'use strict'

const express = require('express');

const controller = require('./aluno.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /aluno/{ra}:
     *  get:
     *    tags:
     *      - Aluno
     *    description: Retorna aluno de acordo com o RA
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: ra
     *        description: RA do aluno
     *        in: path
     *        required: true
     *        type: integer
     *    responses:
     *      200:
     *        description: Retorna um aluno
     */
    router.get('/:ra', controller.buscarAluno);
    router.post('/', controller.cadastrarAluno);
    router.post('/turma', controller.atribuirAlunoATurma);

    return router;
}