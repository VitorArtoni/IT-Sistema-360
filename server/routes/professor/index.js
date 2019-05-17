'use strict'

const express = require('express');

const controller = require('./professor.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /professor/{matricula}:
     *   get:
     *     tags:
     *       - Professor
     *     description: Retorna as informações do Professor(exceto a senha) de acordo com a matrícula
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: matricula
     *         description: Matricula do professor
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Dados do professor
     *       400:
     *         description: Necessário enviar um id da turma como parâmetro
     *       500:
     *         description: Erro inesperado
     */
    router.get('/:matricula', controller.buscarProfessor);

    /**
     * @swagger
     * /professor:
     *   post:
     *     tags:
     *       - Professor
     *     description: Cadastra um professor
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados do professor
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *             - matricula
     *             - senha
     *             - permissao
     *           properties:
     *             nome:
     *               type: string
     *               example: Carlos
     *             matricula:
     *               type: integer
     *               example: 112233
     *             senha:
     *               type: string
     *               example: Carlos123
     *             permissao:
     *               type: string
     *               example: Docente
     *     responses:
     *       200:
     *          description: Professor foi cadastrado com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/', controller.cadastrarProfessor);

    /**
     * @swagger
     * /professor/turma:
     *   post:
     *     tags:
     *       - Professor
     *     description: Atribui um professor a uma turma
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo a matricula do professor e o id da turma
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - matricula
     *             - idTurma
     *           properties:
     *             matricula:
     *               type: integer
     *               example: 112233
     *             idTurma:
     *               type: string
     *               example: SI250A
     *     responses:
     *       200:
     *          description: Professor foi atribuído a turma
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/turma', controller.atribuirTurmaAProfessor);

    return router;
}