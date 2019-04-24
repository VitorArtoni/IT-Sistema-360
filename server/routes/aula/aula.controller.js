'use strict'

const db = require('../../dao/aula.dao');

const getDataDaAula = (req, res) => {
    if (req.params.idturma) {
        db.getDataDaAula(req.params.idturma)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            })
    } 
    else {
        res.send('Envie o id da turma')
    }
}

const criarAula = (req,res) => {
    if (req.body.idTurma && req.body.data){
        db.criarAula(req.body)
            .then(result => {
                if (result.affectedRows > 0){
                    console.log('Aula criada com sucesso');
                    res.send('Aula criada com sucesso');
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
    getDataDaAula,
    criarAula
}