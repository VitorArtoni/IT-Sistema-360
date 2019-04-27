'use strict'

const db = require('../../dao/professor.dao');

const buscarProfessor = (req, res) => {
    if (req.params.matricula) {
        db.getProfessorByMatricula(req.params.matricula)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie uma matricula');
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
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(500).send('Esta matrícula já foi cadastrada');
                }
                else
                    res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Por favor informe nome, matricula, senha e tipo de permissao');
}

module.exports = {
    buscarProfessor,
    cadastrarProfessor
}