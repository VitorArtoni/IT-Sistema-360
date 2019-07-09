'use strict'

const express = require('express');

const controller = require('./atividade.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /atividade:
     *   post:
     *     tags:
     *       - Atividade
     *     description: Cadastra atividade em grupo
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados da atividade
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - idGrupo
     *             - idTopico
     *             - idTurma
     *             - observacao
     *             - conformidade
     *             - interesse
     *             - contextualizacao
     *             - consistencia
     *           properties:
     *             idGrupo:
     *               type: string
     *               example: 1
     *             idTopico:
     *               type: string
     *               example: T1A1
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             observacao:
     *               type: string
     *               example: observacao
     *             conformidade:
     *               type: float
     *               example: 9.0
     *             interesse:
     *               type: float
     *               example: 10.0
     *             contextualizacao:
     *               type: float
     *               example: 7.5
     *             consistencia:
     *               type: float
     *               example: 8.5
     *     responses:
     *       200:
     *          description: Atividade cadastrada com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/', controller.cadastrarAtividade);

    return router;
}