'use strict';

const path = require('path');
const dao = require('../../dao/login.dao');
const bcrypt = require('bcryptjs');
const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');

let refreshTokens = {};

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
};

const loginAluno = (req, res) => {
    const ra = parseInt(req.body.username);
    const senha = req.body.password;

    if (ra && senha) {
        dao.loginAluno(ra)
            .then(result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(senha, result[0].Senha)) {
                        const user = {
                            'username': ra,
                            'role': 'aluno'
                        };
                        const token = jwt.sign(user, process.env.sess_secret, { expiresIn: 600 })
                        const refreshToken = randtoken.uid(256);
                        refreshTokens[refreshToken] = ra;
                        res.json({ jwt: token, refreshToken: refreshToken });
                    }
                    else {
                        console.log('Não autorizado');
                        //res.redirect('/login');
                        res.send('Não autorizado');
                    }
                }
                else {
                    console.log('Aluno fornecido não existe');
                    //res.redirect('/login');
                    res.status(500).send('Aluno fornecido não existe');
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Por favor digite seu RA e senha');
    //res.redirect('/login');
};

const loginProfessor = (req, res) => {
    const matricula = parseInt(req.body.username);
    const senha = req.body.password;

    if (matricula && senha) {
        dao.loginProfessor(matricula)
            .then(result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(senha, result[0].Senha)) {
                        const user = {
                            'username': matricula,
                            'role': result[0].Permissao
                        }
                        const token = jwt.sign(user, process.env.sess_secret, { expiresIn: 600 })
                        const refreshToken = randtoken.uid(256);
                        refreshTokens[refreshToken] = matricula;
                        res.json({ jwt: token, refreshToken: refreshToken });
                    }
                    else {
                        console.log('Senha inválida');
                        //res.redirect('/login');
                        res.send('Não autorizado');
                    }
                }
                else {
                    console.log('Usuário inexistente!');
                    //res.redirect('/login');
                    res.status(500).send('Professor fornecido não existe');
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Por favor digite matrícula e senha');
};

const logout = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens)
        delete refreshTokens[refreshToken];

    res.sendStatus(204);
};

const refreshAToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const permissao = req.body.role;

    if (refreshToken in refreshTokens) {
        const user = {
            'username': refreshTokens[refreshToken],
            'role': permissao
        }

        const token = jwt.sign(user, process.env.sess_secret, { expiresIn: 600 });
        res.json({ jwt: token })
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = {
    getLogin,
    loginAluno,
    loginProfessor,
    logout,
    refreshAToken
}