'use strict'

const express = require('express');

const controller = require('../login/login.controller');

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));   
    }

    router.post('/', controller.logout);

    return router;
}