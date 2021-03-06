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
     *            description: nome do tópico
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
     * /topico/objetivo/{objetivo}:
     *  get:
     *      tags:
     *          - Tópico
     *      description: Retorna as informações do topico de acordo com o objetivo fornecido
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: objetivo
     *            description: objetivo do topico
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *       200:
     *         description: Dados do tópico
     *       400:
     *         description: Necessário enviar um topico como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/objetivo/:objetivo', controller.getTopicoByObjetivo);

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
     *             - idTopico
     *             - nome
     *             - objetivo
     *             - idTurma
     *             - data
     *           properties:
     *             idTopico:
     *               type: string
     *               example: T1A1
     *             nome:
     *               type: string
     *               example: Escolas de adm
     *             objetivo:
     *               type: string
     *               example: Entender como funciona uma unidade sindical
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             data:
     *               type: string
     *               example: '2019-02-02'
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