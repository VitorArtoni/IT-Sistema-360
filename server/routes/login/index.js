'use strict'

const express = require('express');

const controller = require('./login.controller');

const redirectHome = (req, res, next) => {
    if (req.session.userId)
        res.redirect('/home');
    else
        next();
}

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    //router.get('/', redirectHome, controller.getLogin);

    /**
     * @swagger
     * /login/aluno:
     *   post:
     *     tags:
     *       - Login
     *     description: Realiza uma operação de login de aluno
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo RA e senha
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - ra
     *             - senha
     *           properties:
     *             ra:
     *               type: integer
     *               example: 123456
     *             senha:
     *               type: string
     *               example: Joao123
     *     responses:
     *       200:
     *          description: Tentativa de login realizado com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */    
    router.post('/aluno', controller.loginAluno);

    /**
     * @swagger
     * /login/professor:
     *   post:
     *     tags:
     *       - Login
     *     description: Realiza uma operação de login de professor
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: JSON contendo Matricula e senha
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - matricula
     *             - senha
     *           properties:
     *             matricula:
     *               type: integer
     *               example: 112233
     *             senha:
     *               type: string
     *               example: Carlos123
     *     responses:
     *       200:
     *          description: Tentativa de login realizado com sucesso
     *       400:
     *          description: Necessário enviar todos os dados obrigatórios
     *       500:
     *          description: Erro inesperado
     */    
    router.post('/professor', controller.loginProfessor);

    return router;
}