'use strict'

const express = require('express');

const controller = require('./aluno.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    /**
     * @swagger
     * /aluno/{ra}:
     *  get:
     *    tags:
     *      - Aluno
     *    description: Retorna informações do Aluno(exceto a senha) de acordo com o RA
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: ra
     *        description: RA do aluno
     *        in: path
     *        required: true
     *        type: integer
     *    responses:
     *      200:
     *        description: Dados do aluno
     *      400:
     *        description: Necessário enviar um RA como parâmetro
     *      500:
     *        description: Erro inesperado
     */
    router.get('/:ra', controller.buscarAluno);

    /**
     * @swagger
     * /aluno/pre:
     *   post:
     *     tags:
     *       - Aluno
     *     description: Pré-cadastra um aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados do aluno
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - nome
     *             - ra
     *           properties:
     *             nome:
     *               type: string
     *               example: João
     *             ra:
     *               type: integer
     *               example: 123456
     *     responses:
     *       200:
     *          description: Aluno foi pré-cadastrado com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/pre', controller.preCadastrarAluno);

    /**
     * @swagger
     * /aluno/pos:
     *   post:
     *     tags:
     *       - Aluno
     *     description: Cadastra uma senha para o aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo os dados do aluno
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - ra
     *             - senha
     *           properties:
     *             ra:
     *               type: string
     *               example: 123456
     *             senha:
     *               type: integer
     *               example: joao123
     *     responses:
     *       200:
     *          description: Senha do aluno foi cadastrada com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */
    router.post('/pos', controller.cadastrarSenhaAluno);

    /**
     * @swagger
     * /aluno/turma:
     *   post:
     *     tags:
     *       - Aluno
     *     description: Atribui um aluno a uma turma
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA e id da turma
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
     *          description: Aluno foi atribuido à turma
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */    
    router.post('/turma', controller.atribuirAlunoATurma);

    /**
     * @swagger
     * /aluno/grupo:
     *   post:
     *     tags:
     *       - Aluno
     *     description: Alocar um aluno em um grupo
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA, id da turma e id do grupo
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - ra
     *             - idTurma
     *             - idGrupo
     *           properties:
     *             ra:
     *               type: integer
     *               example: 123456
     *             idTurma:
     *               type: string
     *               example: SI250A
     *             idGrupo:
     *               type: integer
     *               example: 1
     *     responses:
     *       200:
     *          description: Aluno foi atribuido à turma
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */   
    router.post('/grupo', controller.alocarAlunoEmGrupo);

    return router;
}