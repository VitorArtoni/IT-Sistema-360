'use strict'

const express = require('express');

const controller = require('./professor.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/:matricula', controller.buscarProfessor);
    router.post('/', controller.cadastrarProfessor);

    return router;
}