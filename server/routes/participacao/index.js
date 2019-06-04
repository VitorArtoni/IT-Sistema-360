'use strict'

const express = require('express');

const controller = require('./participacao.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /participacao/contribuicao:
     *   post:
     *     tags:
     *       - Participacao
     *     description: Insere contribuicao de um aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados da contribuicao
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - idTopico
     *             - ra
     *             - idTurma
     *             - data
     *             - nota
     *           properties:
     *             idTopico:
     *               type: string
     *               example: T1A1
     *             ra:
     *               type: integer
     *               example: 123456
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             data:
     *               type: string
     *               example: '2019-06-01'
     *             nota:
     *               type: float
     *               example: 8.5
     *     responses:
     *       200:
     *          description: Contribuicao inserida com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/contribuicao', controller.inserirContribuicao);

    return router;
}