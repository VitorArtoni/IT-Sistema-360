'use strict'

const express = require('express');

const controller = require('./aula.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/data/:idTurma', controller.getDataDaAula);
    router.post('/', controller.criarAula);

    return router;
}