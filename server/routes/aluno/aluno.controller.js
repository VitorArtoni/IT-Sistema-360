'use strict'

const dao = require('../../dao/aluno.dao');

const buscarAluno = (req, res) => {
    if (req.params.ra) {
        dao.getAlunoByRa(req.params.ra)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else
        res.status(400).send('Envie um RA');
}

const cadastrarAluno = (req, res) => {
    if (req.body.nome && req.body.ra && req.body.senha) {
        dao.cadastroAluno(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Usuário cadastrado com sucesso');
                    res.send({ response: 'Aluno criado' });
                }
                else {
                    if (result.code === 'ER_DUP_ENTRY')
                        res.status(500).send({ response: 'Este RA já foi cadastrado' });
                    else
                        res.status(500).send({ response: `Não foi possível cadastrar o aluno ${req.body.nome}`});
                }
            })
            .catch(err => {
                res.status(500).send({ response: err });
            });
    }
    else
        res.status(400).send({ response:'Forneça dados'});
}

const atribuirAlunoATurma = (req, res) => {
    if (req.body.idTurma && req.body.ra) {
        dao.atribuirAlunoATurma(req.body)
            .then(result => {
                if (parseInt(result.affectedRows) > 0) {
                    console.log('Aluno atribuído a turma ' + req.body.idTurma);
                    res.send( { response: `Aluno atribuído a turma ${req.body.idTurma}`});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({response: err});
            });
    }
    else
        res.status(400).send({response: 'Por favor informe o id da turma e o RA'});
}

const alocarAlunoEmGrupo = (req,res) => {
    if (req.body.ra && req.body.idGrupo && req.body.idTurma) {
        dao.alocarAlunoEmGrupo(req.body)
            .then(result => {
                if (parseInt(result.affectedRows) > 0) {
                    console.log('Aluno alocado no grupo ' + req.body.idGrupo);
                    res.send({response:`Aluno alocado no grupo ${req.body.idGrupo}`});
                }
                else {
                    console.log('RA ou id da turma fornecido não existe, ou o aluno não está alocado em uma turma');
                    res.send({response:'RA ou id da turma fornecido não existe, ou o aluno não está alocado em uma turma'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({response:err});
            });
    }
    else
        res.status(400).send({response:'Por favor informe o RA, id do grupo e id da turma'});
}

module.exports = {
    buscarAluno,
    cadastrarAluno,
    atribuirAlunoATurma,
    alocarAlunoEmGrupo
}