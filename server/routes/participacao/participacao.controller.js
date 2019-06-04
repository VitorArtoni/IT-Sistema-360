'use strict'

const db = require('../../dao/participacao.dao');

const inserirContribuicao = (req,res) => {
    if (req.body.id && req.body.ra && req.body.idTurma
        && req.body.data && req.body.nota) {
            db.inserirContribuicao(req.body)
                .then(result => {
                    if (parseInt(result.affectedRows) > 0) {
                        console.log('Contribuição inserida com sucesso');
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

module.exports = {
    inserirContribuicao
}