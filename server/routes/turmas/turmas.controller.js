'use strict'

const dao = require('../../dao/turmas.dao');
const alunoDao = require('../../dao/aluno.dao');

const getTurmas = (req, res) => {
    dao.getTurmas()
        .then(result => {
            res.send({response:result});
        })
        .catch(err => {
            res.status(500).send({response:err});
        })
}

const criarTurma = (req, res) => {
    if (req.body.idTurma && req.body.disciplina
        && req.body.semestre && req.body.ano) {
        dao.criarTurma(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Turma criada com sucesso');
                    res.send({response:'Turma criada com sucesso'});
                }
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else {
        res.status(400).send({response:'Por favor forneça o id da turma, nome da disciplina, semestre e ano da turma'});
    }
}

const calcularNotaTurma = (req, res) => {
    alunoDao.calcularNotasTurma(req.params.idTurma)
        .then(result => {
            res.send({response:result});
        })
        .catch(err => {
            res.status(500).send({response:err});
        })
}

module.exports = {
    getTurmas,
    criarTurma,
    calcularNotaTurma
}