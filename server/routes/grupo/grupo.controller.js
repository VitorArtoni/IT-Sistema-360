'use strict'

const dao = require('../../dao/grupo.dao');

const getGrupoById = (req, res) => {
    if (req.params.id) {
        dao.getGrupoById(req.params.id)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie o id do grupo');
}

const getGrupoByNome = (req, res) => {
    if (req.params.nome) {
        dao.getGrupoByNome(req.params.nome)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie um nome');
}

const criarGrupo = (req, res) => {    
    if (req.body.nome) {
        dao.criarGrupo(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Grupo criado com sucesso');
                    res.send('Grupo ' + req.body.nome + ' criado');
                }
                else {
                    res.status(500).send('Não foi possível criar o grupo')
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
    getGrupoById,
    getGrupoByNome,
    criarGrupo
}