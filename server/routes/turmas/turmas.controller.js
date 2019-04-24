'use strict'

const db = require('../../dao/turmas.dao');

const getTurmas = (req, res) => {
    db.getTurmas()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.send(null);
        })
}

const criarTurma = (req, res) => {
    if (req.body.idTurma
        && req.body.disciplina
        && req.body.semestre
        && req.body.ano) {
        db.criarTurma(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Turma criada com sucesso');
                    res.send('Turma criada com sucesso');
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }
    else {
        res.send('Forneça dados');
    }
}

module.exports = {
    getTurmas,
    criarTurma
}