'use strict'

const db = require('../../dao/topico.dao');

const getTopicoByName = (req,res) => {
    if (req.params.nome) {
        db.getTopicoByName(req.params.nome)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o nome do tópico');
}

const getTopicoByTurma = (req,res) => {
    if (req.params.idTurma) {
        db.getTopicoByTurma(req.params.idTurma)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o id da turma');
}

const criarTopico = (req,res) => {
    if (req.body.idTopico && req.body.nome 
            && req.body.idTurma && req.body.data) {
        db.criarTopico(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Tópico criado com sucesso');
                    res.send('Tópico "' + req.body.nome + '" criado');
                }
                else {
                    res.status(500).send('Não foi possível criar o tópico')
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Forneça dados');
}

module.exports = {
    getTopicoByName,
    getTopicoByTurma,
    criarTopico
}