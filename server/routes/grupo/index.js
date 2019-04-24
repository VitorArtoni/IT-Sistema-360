'use strict'

const express = require('express');

const controller = require('./grupo.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/id/:id', controller.getGrupoById);
    router.get('/nome/:nome', controller.getGrupoByNome);
    router.post('/', controller.criarGrupo);

    return router;
}