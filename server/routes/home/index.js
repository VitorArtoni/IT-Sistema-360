'use strcit'

const express = require('express');

const controller = require('./home.controller');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId)
        res.redirect('/login');
    else
        next();
}

module.exports = (middlewares) => {
    const router = express.Router();

    if (middlewares) {
        middlewares.forEach(middleware => router.use(middleware));
    }

    router.get('/', redirectLogin, controller.getHome);
    router.post('/logout', controller.logout);

    return router;
};