'use strict'

const db = require('../../dao/aula.dao');

const getDataDaAula = (req, res) => {
    if (req.params.idTurma) {
        db.getDataDaAula(req.params.idTurma)
            .then(result => {
                if (result.length > 0)
                    res.send(result);
                else
                    res.send('Turma fornecida não existe');
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o id da turma');
}

const criarAula = (req, res) => {
    if (req.body.idTurma && req.body.data) {
        db.criarAula(req.body)
            .then(result => {
                if (result != 'turma_nao_existe') {
                    console.log('Aula criada com sucesso');
                    res.send('Aula criada com sucesso');
                }
                else{
                    res.status(500).send('A turma fornecida não existe');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Por favor forneça o id da turma e data da aula');
}

module.exports = {
    getDataDaAula,
    criarAula
}