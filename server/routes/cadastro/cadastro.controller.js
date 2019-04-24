'use strict'

const path = require('path');
const db = require('../../dao/cadastro.dao');

const getCadastro = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/cadastro.html'));
}

const getCadastroProfessor = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/cadastroProfessor.html'));
}

const cadastroAluno = (req, res) => {
    if (req.body.nome && req.body.ra && req.body.senha) {
        db.cadastroAluno(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Usuário cadastrado com sucesso');
                    res.send('Aluno criado');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('Este RA já foi cadastrado');
                    res.send('Este RA ja foi cadastrado');
                }
            });
    }
    else {
        res.send('Forneça dados');
    }
}

const cadastroProfessor = (req, res) => {
    if (req.body.nome && req.body.matricula && req.body.senha) {
        db.cadastroProfessor(req.body)
            .then(result => {
                if (result.affectedRows > 0) {
                    console.log('Professor cadastrado com sucesso');
                    res.send('Professor cadastrado com sucesso');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('Esta matrícula já foi cadastrada');
                    res.send('Esta matrícula já foi cadastrada');
                }
            });
    }
}

module.exports = {
    getCadastro,
    getCadastroProfessor,
    cadastroAluno,
    cadastroProfessor
}