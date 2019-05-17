'use strict'

const express = require('express');

const controller = require('./grupo.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /grupo/id/{id}:
     *   get:
     *     tags:
     *       - Grupo
     *     description: Retorna todas as informações do grupo de acordo com o seu id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: id do grupo
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Dados do grupo
     *       400:
     *         description: Necessário enviar um id do grupo como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/id/:id', controller.getGrupoById);

    /**
     * @swagger
     * /grupo/nome/{nome}:
     *   get:
     *     tags:
     *       - Grupo
     *     description: Retorna todas as informações do grupo de acordo com o seu nome
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: nome
     *         description: nome do grupo
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Dados do grupo
     *       400:
     *         description: Necessário enviar um nome do grupo como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/nome/:nome', controller.getGrupoByNome);

    /**
     * @swagger
     * /grupo:
     *   post:
     *     tags:
     *       - Grupo
     *     description: Cadastra um grupo
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo o nome do grupo
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *           properties:
     *             nome:
     *               type: string
     *               example: Grupo 123
     *     responses:
     *       200:
     *          description: Grupo criado
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */   
    router.post('/', controller.criarGrupo);

    return router;
}