'use strict'

const db = require('../../dao/aluno.dao');

const buscarAluno = (req,res) => {
    return null;
}

const cadastrarAluno = (req, res) => {
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
                    res.send('Este RA já foi cadastrado');
                }
            });
    }
    else {
        res.send('Forneça dados');
    }
}

module.exports = {
    buscarAluno,
    cadastrarAluno
}