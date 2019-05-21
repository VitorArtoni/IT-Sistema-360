'use strict'

const db = require('../../dao/objetos.dao');

const getObjetoByNome = (req, res) => {
    if (req.params.nome) {
        db.getObjetoByNome(req.params.nome)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o nome do objeto de avaliação');
}

const criarObjeto = (req, res) => {    
    if (req.body.nome) {
        db.criarObjeto(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Objeto de avaliação criado com sucesso');
                    res.send('Objeto de avaliação ' + req.body.nome + ' criado');
                }
                else {
                    res.status(500).send('Não foi possível criar o objeto de avaliação')
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
    getObjetoByNome,
    criarObjeto
}