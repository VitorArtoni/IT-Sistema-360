'use strict'

const db = require('../../dao/aluno.dao');

const buscarAluno = (req, res) => {
    if (req.params.ra) {
        db.getAlunoByRa(req.params.ra)
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
        db.cadastroAluno(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Usuário cadastrado com sucesso');
                    res.send('Aluno criado');
                }
                else {
                    if (result.code === 'ER_DUP_ENTRY')
                        res.status(500).send('Este RA já foi cadastrado');
                    else
                        res.status(500).send('Não foi possível cadastrar o aluno ', err);
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Forneça dados');
}

const atribuirAlunoATurma = (req, res) => {
    if (req.body.idTurma && req.body.RA) {
        db.atribuirAlunoATurma(req.body)
            .then(result => {
                if (parseInt(result.affectedRows) > 0) {
                    console.log('Aluno atribuído a turma ' + req.body.idTurma);
                    res.send('Aluno atribuído a turma ' + req.body.idTurma);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
    else
        res.status(400).send('Por favor informe o id da turma e o RA');
}

module.exports = {
    buscarAluno,
    cadastrarAluno,
    atribuirAlunoATurma
}