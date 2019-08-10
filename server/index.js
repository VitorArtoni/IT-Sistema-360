'use strict'

const configureApp = app => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const jwtStrategy = require('passport-jwt').Strategy;
    const extractJwt = require('passport-jwt').ExtractJwt;
    const passport = require('passport');
    const cors = require('cors');

    require('dotenv').config({
        silent: true
    });

    const passportOptions = {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.sess_secret
    }

    app.use('/swagger', express.static('api-docs'));
    app.use('/it', express.static('dist'));
    app.use(express.static('dist'));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new jwtStrategy(passportOptions, (jwtPayload, done) => {
        const expirationDate = new Date(jwtPayload.exp * 1000);
        if (expirationDate < new Date())
            return done(null, false);

        done(null, jwtPayload);
    }))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    });

    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
};

const configSwagger = app => {
    const swaggerJSDoc = require('swagger-jsdoc');

    const swaggerDefinition = {
        info: {
            title: 'Sistema360 API',
            version: '1.0.0'
        },
        host: 'localhost:' + process.env.port,
        basePath: '/'
    };

    const options = {
        swaggerDefinition: swaggerDefinition,
        apis: ['./server/routes/**/*.js']
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

const initRoutes = app => {
    const home = require('./routes/home');
    const aluno = require('./routes/aluno');
    const professor = require('./routes/professor');
    const login = require('./routes/login');
    const logout = require('./routes/logout')
    const turmas = require('./routes/turmas');
    const grupo = require('./routes/grupo');
    const aula = require('./routes/aula');
    const topico = require('./routes/topico');
    const participacao = require('./routes/participacao');
    const atividade = require('./routes/atividade');

    app.use('/home', home());
    app.use('/aluno', aluno());
    app.use('/professor', professor());
    app.use('/login', login());
    app.use('/logout', logout());
    app.use('/turmas', turmas());
    app.use('/grupo', grupo());
    app.use('/aula', aula());
    app.use('/topico', topico());
    app.use('/participacao', participacao());
    app.use('/atividade', atividade());
};

const startApp = app => {
    const http = require('http');
    const server = http.createServer(app);

    server.listen(process.env.port, () => {
        console.log('Server started on port ' + process.env.port);
    });

    process.on('unhandledRejection', (reason, p) => {
        console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason)
    });

    process.on('uncaughtException', (reason, p) => {
        console.log("Uncaught Exception at: Promise ", p, " reason: ", reason)
    });
};

const init = app => {
    configureApp(app);
    configSwagger(app);
    initRoutes(app);
    startApp(app);
};

module.exports = init;