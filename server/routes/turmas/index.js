'use strict'

const express = require('express');

const controller = require('./turmas.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /turmas:
     *  get:
     *    tags:
     *      - Turmas
     *    description: Retorna uma lista com todas as turmas cadastradas
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: Lista de turmas
     *      500:
     *        description: Erro inesperado
     */
    router.get('/', controller.getTurmas);

    /**
     * @swagger
     * /turmas:
     *   post:
     *     tags:
     *       - Turmas
     *     description: Cadastra uma turma
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados da turma
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - idTurma
     *             - disciplina
     *             - semestre
     *             - ano
     *           properties:
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             disciplina:
     *               type: string
     *               example: Economia e Finanças
     *             semestre:
     *               type: string
     *               example: S1
     *             ano:
     *               type: integer
     *               example: 2019
     *     responses:
     *       200:
     *          description: Turma foi cadastrada com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/', controller.criarTurma);

    return router;
}