'use strict'

const dao = require('../../dao/aula.dao');

const getDataDaAula = (req, res) => {
    if (req.params.idTurma) {
        dao.getDataDaAula(req.params.idTurma)
            .then(result => {
                if (result.length > 0)
                    res.send({response: result});
                else
                    res.send({response:'Nenhum resultado encontrado'});
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie o id da turma'});
}

const criarAula = (req, res) => {
    if (req.body.idTurma && req.body.data) {
        dao.criarAula(req.body)
            .then(result => {
                if (result != 'turma_nao_existe') {
                    console.log('Aula criada com sucesso');
                    res.send({response:'Aula criada com sucesso'});
                }
                else {
                    res.status(500).send({response:'A turma fornecida não existe'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({response:err});
            });
    }
    else
        res.status(400).send({response:'Por favor forneça o id da turma e data da aula'});
}

const marcarPresenca = (req, res) => {
    if (req.body.ra && req.body.idTurma && req.body.idAula && req.body.presenca) {
        dao.marcarPresenca(req.body)
            .then(result => {
                if (parseInt(result.affectedRows) > 0) {
                    console.log('Presença marcada com sucesso');
                    res.send({response:'Presença marcada com sucesso'});
                }
                else {
                    res.status(500).send({response:'Não foi possível marcar a presença'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send({response:'Por favor forneça ra, id da turma, id da aula e a presença do aluno'});
}

module.exports = {
    getDataDaAula,
    criarAula,
    marcarPresenca
}