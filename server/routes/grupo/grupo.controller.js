'use strict'

const dao = require('../../dao/grupo.dao');

const getGrupoById = (req, res) => {
    if (req.params.id) {
        dao.getGrupoById(req.params.id)
            .then(result => {
                res.send({response:result});
            })
            .catch(err => {
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie o id do grupo'});
}

const getGrupoByNome = (req, res) => {
    if (req.params.nome) {
        dao.getGrupoByNome(req.params.nome)
            .then(result => {
                res.send({response:result});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({response:err});
            })
    }
    else
        res.status(400).send({response:'Envie um nome'});
}

const criarGrupo = (req, res) => {    
    if (req.body.nome) {
        dao.criarGrupo(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Grupo criado com sucesso');
                    res.send({response:`Grupo ${req.body.nome} criado`});
                }
                else {
                    res.status(500).send({response:'Não foi possível criar o grupo'})
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
    getGrupoById,
    getGrupoByNome,
    criarGrupo
}