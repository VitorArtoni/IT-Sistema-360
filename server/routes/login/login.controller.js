'use strict';

const path = require('path');
const dao = require('../../dao/login.dao');
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
};

const loginAluno = (req, res) => {
    const ra = parseInt(req.body.ra);
    const senha = req.body.senha;

    if (ra && senha) {
        dao.loginAluno(req.body)
            .then(result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(senha, result[0].Senha)) {
                        req.session.userId = result[0].RA;
                        //res.redirect('/home');
                        res.send('Autorizado');
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
    const matricula = parseInt(req.body.matricula);
    const senha = req.body.senha;

    if (matricula && senha) {
        dao.loginProfessor(req.body)
            .then(result => {
                if (result.length > 0) {
                    if (bcrypt.compareSync(senha, result[0].Senha)) {
                        req.session.userId = result[0].Matricula;
                        req.session.permissao = result[0].Permissao;
                        //res.redirect('/home');
                        res.send('Autorizado');
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

module.exports = {
    getLogin,
    loginAluno,
    loginProfessor
}