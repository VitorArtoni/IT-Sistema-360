'use strict'

const express = require('express');

const controller = require('./requisitos.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /requisitos/nome/{nome}:
     *   get:
     *     tags:
     *       - Requisitos de Avaliação
     *     description: Retorna todas as informações do requisito de avaliação de acordo com o nome
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: nome
     *         description: nome do requisito de avaliação
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Dados do requisito de avaliação
     *       400:
     *         description: Necessário enviar um nome como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/nome/:nome', controller.getRequisitoByNome);

    /**
     * @swagger
     * /requisitos:
     *   post:
     *     tags:
     *       - Requisitos de Avaliação
     *     description: Cadastra um requisito de avaliação
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo o nome do requisito de avaliação
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *           properties:
     *             nome:
     *               type: string
     *               example: Requisito de avaliação Número 1
     *     responses:
     *       200:
     *          description: Requisito de avaliação criado
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */   
    router.post('/', controller.criarRequisito);

    return router;
}