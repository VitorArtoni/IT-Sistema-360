'use strict'

const db = require('../../dao/grupo.dao');

const getGrupoById = (req, res) => {
    if (req.params.id) {
        db.getGrupoById(req.params.id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            })
    }
    else
        res.send('Envie um id');
}

const getGrupoByNome = (req, res) => {
    if (req.params.nome) {
        db.getGrupoByNome(req.params.nome)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            })
    }
    else
        res.send('Envie um nome');
}

const criarGrupo = (req, res) => {    
    if (req.body.nome) {
        db.criarGrupo(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Grupo criado com sucesso');
                    res.send('Grupo ' + req.body.nome + ' criado');
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }
    else{
        res.send('Forneça dados');
    }
}

module.exports = {
    getGrupoById,
    getGrupoByNome,
    criarGrupo
}