'use strict'

const express = require('express');

const controller = require('./objetos.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /objetos/nome/{nome}:
     *   get:
     *     tags:
     *       - Objetos de Avaliação
     *     description: Retorna todas as informações do objeto de avaliação de acordo com o nome
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: nome
     *         description: nome do objeto de avaliação
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Dados do objeto de avaliação
     *       400:
     *         description: Necessário enviar um nome como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/nome/:nome', controller.getObjetoByNome);

    /**
     * @swagger
     * /objetos:
     *   post:
     *     tags:
     *       - Objetos de Avaliação
     *     description: Cadastra um objeto de avaliação
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo o nome do objeto de avaliação
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *           properties:
     *             nome:
     *               type: string
     *               example: Objeto de avaliação Número 1
     *     responses:
     *       200:
     *          description: Objeto de avaliação criado
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */   
    router.post('/', controller.criarObjeto);

    return router;
}