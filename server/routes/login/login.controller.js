'use strict';
const path = require('path');
const db = require('../../dao/login.dao');
const connection = require('../../database');

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/login.html'));
};

const loginAluno = (req, res) => {
    const ra = parseInt(req.body.ra);
    const password = req.body.password;

    if (ra && password) {
        db.loginAluno(ra,password)
            .then((result) => {
                if (result.length > 0) {
                    req.session.userId = result[0].RA;
                    return res.redirect('/home');
                }
                else
                    console.log('RA e/ou Senha inválida!');
                res.redirect('/login');
            })
            .catch(err => console.log(err));
    }
};

module.exports = {
    getLogin,
    loginAluno,
}