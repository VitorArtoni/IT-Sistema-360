'use strict'

const configureApp = app => {
    const express = require('express');
    const session = require('express-session');
    const bodyParser = require('body-parser');
    const path = require('path');
    const swaggerJSDoc = require('swagger-jsdoc');

    require('dotenv').config({
        silent: true
    });

    const swaggerDefinition = {
        info: {
            title: 'Sistema360 API',
            version: '1.0.0',
        },
        host: 'localhost:' + process.env.port,
        basePath: '/'
    };

    const swaggerOptions = {
        swaggerDefinition: swaggerDefinition,
        apis: ['./routes/*.js']
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.get('/swagger.json', (req,res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/swagger', express.static('api-docs'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        name: process.env.sess_name,
        resave: false,
        saveUninitialized: false,
        secret: process.env.sess_secret,
        cookie: {
            maxAge: parseInt(process.env.sess_lifetime),
            sameSite: true,
            secure: process.env.node_env === 'prod'
        }
    }));

    const users = [
        { ra: 1, name: 'Vitor', email: 'vitor@teste.com', password: 'teste123' },
        { ra: 2, name: 'User1', email: 'user1@teste.com', password: 'teste123' },
        { ra: 3, name: 'User2', email: 'user2@teste.com', password: 'teste123' },
    ]

    app.use((req, res, next) => {
        const { userId } = req.session;
        if (userId) {
            res.locals.user = users.find(user => user.id === userId);
        }
        next();
    });

    let allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');

        if ('OPTIONS' === req.method)
            res.send(200, '');
        else
            next();
    };
    app.use(allowCrossDomain);

    app.get('/', (req, res) => {
        res.send('Hello world');
    });
};

const initRoutes = app => {
    const home = require('./routes/home');
    const aluno = require('./routes/aluno');
    const professor = require('./routes/professor');
    const login = require('./routes/login');
    const turmas = require('./routes/turmas');
    const grupo = require('./routes/grupo');
    const aula = require('./routes/aula');

    app.use('/home', home());
    app.use('/aluno', aluno());
    app.use('/professor', professor());
    app.use('/login', login());
    app.use('/turmas', turmas());
    app.use('/grupo', grupo());
    app.use('/aula', aula());
};

const startApp = app => {
    const http = require('http');
    const server = http.createServer(app);
    server.listen(process.env.port, () => {
        console.log('Server started on http://localhost:' + process.env.port);
    });
};

const init = app => {
    configureApp(app);
    initRoutes(app);
    startApp(app);
};

module.exports = init;