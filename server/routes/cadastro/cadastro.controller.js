'use strict'

const path = require('path');
const db = require('../../dao/cadastro.dao');

const getCadastro = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/cadastro.html'));
}

const cadastroAluno = (req, res) => {
    if (req.body.nome && req.body.ra && req.body.senha) {
        db.cadastroAluno(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Usuário cadastrado com sucesso');
                    res.redirect('/login');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY')
                    console.log('Este RA já foi cadastrado');
            
                res.redirect('/cadastro');
            });
    }
};
module.exports = {
    getCadastro,
    cadastroAluno
}