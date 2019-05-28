'use strict'

const express = require('express');

const controller = require('./aula.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /aula/data/{idTurma}:
     *   get:
     *     tags:
     *       - Aula
     *     description: Retorna todas as datas das aulas referentes a determinada turma
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: idTurma
     *         description: id da turma
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Datas das aulas
     *       400:
     *         description: Necessário enviar um id da turma como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/data/:idTurma', controller.getDataDaAula);

    /**
     * @swagger
     * /aula:
     *   post:
     *     tags:
     *       - Aula
     *     description: Cadastra uma aula para uma turma
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA e id da turma
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - idTurma
     *             - data
     *           properties:
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             data:
     *               type: string
     *               example: '2019-04-01'
     *     responses:
     *       200:
     *          description: Aula criada
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */    
    router.post('/', controller.criarAula);

    /**
     * @swagger
     * /aula/presenca:
     *   post:
     *     tags:
     *       - Aula
     *     description: Marca presença para um aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA, idTurma, idAula e presenca
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - RA
     *             - idTurma
     *             - idAula
     *             - presenca
     *           properties:
     *             ra:
     *               type: string
     *               example: 123456
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             idAula:
     *               type: integer
     *               example: 1
     *             presenca:
     *               type: float
     *               example: 0.8
     *     responses:
     *       200:
     *          description: Presenca marcada
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */ 
    router.post('/presenca', controller.marcarPresenca);

    return router;
}