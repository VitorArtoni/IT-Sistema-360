'use strict'

const dao = require('../../dao/atividade.dao');
const alunoDao = require('../../dao/aluno.dao');

const cadastrarAtividade = (req, res) => {
    if (req.body.idGrupo && req.body.idTopico && req.body.idTurma) {
        dao.inserirAtividade(req.body)
            .then(result => {
                dao.calcularMediaGrupo(req.body)
                    .then(response => {
                        if (response.affectedRows > 0)
                            console.log('Média calculada');
                        else
                            console.log('Não foi possível calcular a média');
                    })
                    .catch(err2 => { throw err });

                return result;
            })
            .then(async result2 => {
                if (result2.affectedRows > 0){
                    await dao.inicializarAtividadeAlunos(req.body)
                        .then(response => {
                            res.send({response:'Atividade do grupo cadastrada com sucesso'});
                        });
                }
                else
                res.status(500).send({response:'Não foi possível cadastrar a atividade do grupo'});
            })
            .then(() => {
                alunoDao.calcularNotasTurma(req.body.idTurma)
                    .catch(err => console.log(err));
            })
            .catch(err => {
                res.status(500).send({response: err});
            })
    }
    else
        res.status(400).send({response:'Envie os dados obrigatórios'});
}

module.exports = {
    cadastrarAtividade
}