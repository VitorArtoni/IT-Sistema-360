'use strict'

const dao = require('../../dao/topico.dao');
const participacaoDao = require('../../dao/participacao.dao');

const getTopicoByName = (req,res) => {
    if (req.params.nome) {
        dao.getTopicoByName(req.params.nome)
            .then(result => {
                res.send({response:result});
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie o nome do tópico'});
}

const getTopicoByTurma = (req,res) => {
    if (req.params.idTurma) {
        dao.getTopicoByTurma(req.params.idTurma)
            .then(result => {
                res.send({response:result});
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie o id da turma'});
}

const getTopicoByObjetivo = (req,res) => {
    if (req.params.objetivo) {
        dao.getTopicoByObjetivo(req.params.objetivo)
            .then(result => {
                res.send({response:result});
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie o objetivo do topico'});
}

const criarTopico = (req,res) => {
    if (req.body.idTopico && req.body.nome 
            && req.body.idTurma && req.body.data && req.body.objetivo) {
        dao.criarTopico(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Tópico criado com sucesso');   
                    participacaoDao.calcularEficienciaDaTurma(req.body.idTurma);
                    participacaoDao.getNotas(req.body.idTurma);
                    res.send({response:`Tópico ${req.body.nome} criado`});
                }
                else {
                    res.status(500).send({response:'Não foi possível criar o tópico'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({response:err});
            });
    }
    else
        res.status(400).send({response:'Forneça dados'});
}

module.exports = {
    getTopicoByName,
    getTopicoByTurma,
    getTopicoByObjetivo,
    criarTopico
}