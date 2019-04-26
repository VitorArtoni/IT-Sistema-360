'use strict'

const db = require('../../dao/professor.dao');

const buscarProfessor = (req, res) => {
    return null;
}

const cadastrarProfessor = (req, res) => {
    if (req.body.nome && req.body.matricula && req.body.senha && req.body.permissao) {
        db.cadastroProfessor(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Professor cadastrado com sucesso');
                    res.send('Professor cadastrado com sucesso');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('Esta matrícula já foi cadastrada');
                    res.send('Esta matrícula já foi cadastrada');
                }
            });
    }
}

module.exports = {
    buscarProfessor,
    cadastrarProfessor
}