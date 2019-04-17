'use strict';

const path = require('path');
const db = require('../../dao/login.dao');
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
};

const loginAluno = (req, res) => {
    console.log(req.body);
    
    const ra = parseInt(req.body.ra);
    const senha = req.body.senha;

    if (ra && senha) {
        db.loginAluno(req.body)
            .then(result => {
                if (result.length > 0) {        
                    if (bcrypt.compareSync(senha, result[0].Senha)) {
                        req.session.userId = result[0].RA;
                        //res.redirect('/home');
                        res.send('Autorizado');
                    }
                    else{
                        console.log('Senha inválida');
                        //res.redirect('/login');
                        res.send('Não Autorizado');
                    }
                }
                else {
                    console.log('Usuário inexistente!');
                    //res.redirect('/login');
                    res.send('Usuário Inexistente');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        console.log('Por favor digite seu RA e senha');
        //res.redirect('/login');
        res.send('Digite alguma coisa');
    }
};

const loginProfessor = (req, res) => {
    const matricula = parseInt(req.body.matricula);
    const password = req.body.password;

    if (matricula && password) {
        db.loginProfessor(req.body)
            .then(result => {
                if (result.length > 0) {        
                    if (bcrypt.compareSync(password, result[0].Senha)) {
                        req.session.userId = result[0].Matricula;
                        req.session.permissao = result[0].Permissao;
                        res.redirect('/home');
                    }
                    else{
                        console.log('Senha inválida');
                        res.redirect('/login');
                    }
                }
                else {
                    console.log('Usuário inexistente!');
                    res.redirect('/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        console.log('Por favor digite sua matrícula e senha');
        res.redirect('/login');
    }
};

module.exports = {
    getLogin,
    loginAluno,
    loginProfessor
}