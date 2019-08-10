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
     * /aula/falta:
     *   post:
     *     tags:
     *       - Aula
     *     description: Marcar falta para um aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA, idTurma, idAula e falta
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - RA
     *             - idTurma
     *             - idAula
     *             - falta
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
     *             falta:
     *               type: float
     *               example: 0.5
     *     responses:
     *       200:
     *          description: Falta marcada
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */ 
    router.post('/falta', controller.marcarFalta);

    return router;
}