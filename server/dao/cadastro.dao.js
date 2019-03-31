const connection = require('../database');
const bcrypt = require('bcryptjs');

const cadastroAluno = async function (req, res) {
    const nome = req.nome;
    const ra = parseInt(req.ra);
    const senha = await hashPassword(req.senha);

    return await connection.query('INSERT INTO aluno (RA, Nome, Senha) VALUES (?,?,?)', [ra, nome, senha])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

const cadastroProfessor = async function (req, res) {
    const nome = req.nome;
    const matricula = parseInt(req.matricula);
    const senha = await (hashPassword(req.senha));
    const permissao = req.permissao;

    return await connection.query('INSERT INTO professor (Matricula,Nome,Senha,Permissao) VALUES (?,?,?,?)', [matricula, nome, senha, permissao])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

async function hashPassword(senha) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(senha, parseInt(process.env.salt), function (err, hash) {
            if (err) reject(err)
            resolve(hash);
        });
    });
    return hashedPassword;
}

module.exports = {
    cadastroAluno,
    cadastroProfessor
}