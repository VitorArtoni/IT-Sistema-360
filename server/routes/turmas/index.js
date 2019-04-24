'use strict'

const express = require('express');

const controller = require('./turmas.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/', controller.getTurmas);
    router.post('/', controller.criarTurma);

    return router;
}