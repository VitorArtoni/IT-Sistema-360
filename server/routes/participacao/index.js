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

    /**
     * @swagger
     * /participacao/eficiencia:
     *   post:
     *     tags:
     *       - Participacao
     *     description: Calcula participacao de um aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados do aluno e turma
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - ra
     *             - idTurma
     *           properties:
     *             ra:
     *               type: integer
     *               example: 123456
     *             idTurma:
     *               type: string
     *               example: SI250A
     *     responses:
     *       200:
     *          description: Calculo realizado com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/eficiencia', controller.calcularEficiencia);

    /**
     * @swagger
     * /participacao/media/{idTurma}:
     *   get:
     *     tags:
     *       - Participacao
     *     description: Calcula media de todos os alunos em participação na turma
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: idTurma
     *         description: id da turma
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *          description: Médias dos alunos em participação
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.get('/media/:idTurma', controller.calcularMedia);

    return router;
}