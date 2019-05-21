'use strict'

const db = require('../../dao/requisitos.dao');

const getRequisitoByNome = (req, res) => {
    if (req.params.nome) {
        db.getRequisitoByNome(req.params.nome)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o nome do requisito de avaliação');
}

const criarRequisito = (req, res) => {    
    if (req.body.nome) {
        db.criarRequisito(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Requisito de avaliação criado com sucesso');
                    res.send('Requisito de avaliação ' + req.body.nome + ' criado');
                }
                else {
                    res.status(500).send('Não foi possível criar o requisito de avaliação')
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
    getRequisitoByNome,
    criarRequisito
}