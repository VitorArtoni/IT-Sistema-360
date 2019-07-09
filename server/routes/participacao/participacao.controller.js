'use strict'

const dao = require('../../dao/participacao.dao');
const alunoDao = require('../../dao/aluno.dao');

const inserirContribuicao = (req, res) => {
    if (req.body.idTopico && req.body.ra && req.body.idTurma && req.body.nota) {
        dao.inserirContribuicao(req.body)
            .then(result => {
                if (parseInt(result.affectedRows) > 0) {
                    console.log('Contribuição inserida com sucesso');

                    dao.calcularEficiencia(req.body)
                        .catch(err => {
                            throw err;
                        })

                    res.send('Contribuição inserida com sucesso');
                }
                else {
                    res.status(500).send('Não foi possível inserir a contribuição');
                }
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie os dados obrigatórios');
}

const calcularEficiencia = (req, res) => {
    if (req.body.ra && req.body.idTurma) {
        dao.calcularEficiencia(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    res.send('Eficiência calculada com sucesso');
                }
                else
                    res.status(500).send('Não foi possível calcular a eficiência');
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie os dados obrigatórios');
}

const calcularMedia = (req, res) => {
    if (req.params.idTurma) {
        dao.getNotas(req.params.idTurma)
            .then(result => {
                alunoDao.calcularNotasTurma(req.params.idTurma)
                    .catch(err => {
                        throw err;
                    })
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o id da turma');
}

module.exports = {
    inserirContribuicao,
    calcularEficiencia,
    calcularMedia
}