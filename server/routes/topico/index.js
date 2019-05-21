'use strict'

const express = require('express');

const controller = require('./topico.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /topico/nome/{nome}:
     *  get:
     *      tags:
     *          - Tópico
     *      description: Retorna todas as informações dos tópicos de acordo o nome fornecido
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: nome
     *            description: nome do grupo
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: Dado dos tópicos
     *          400:
     *              description: Necessário enviar um nome como parâmetro
     *          500:
     *              description: Erro inesperado
     */
    router.get('/nome/:nome', controller.getTopicoByName);

    /**
     * @swagger
     * /topico/turma/{idTurma}:
     *  get:
     *      tags:
     *          - Tópico
     *      description: Retorna as informações do topico de acordo com o id da turma fornecido
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: idTurma
     *            description: id da turma
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *       200:
     *         description: Dados do tópico
     *       400:
     *         description: Necessário enviar um id da turma como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/turma/:idTurma', controller.getTopicoByTurma);

    /**
     * @swagger
     * /topico:
     *   post:
     *     tags:
     *       - Tópico
     *     description: Cadastra um tópico
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados do tópico
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *             - idTurma
     *           properties:
     *             nome:
     *               type: string
     *               example: A aplicação de juros compostos no dia a dia
     *             idTurma:
     *               type: string
     *               example: SI250A
     *     responses:
     *       200:
     *         description: Tópico criado
     *       400:
     *         description: Necessário enviar todos os dados obrigatórios
     *       500:
     *         description: Erro inesperado
     */
    router.post('/', controller.criarTopico);

    return router;
}