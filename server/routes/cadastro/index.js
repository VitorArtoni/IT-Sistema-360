'use strict'

const express = require('express');

const controller = require('./cadastro.controller');

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

    router.get('/', redirectHome, controller.getCadastro);
    router.post('/', redirectHome, controller.cadastroAluno);

    return router;
}