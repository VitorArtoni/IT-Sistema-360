const connection = require('../database');
const hash = require('../service/hashing');

const getProfessorByMatricula = async (req,res) => {
    let matricula = parseInt(req);

    return await connection.query('SELECT Matricula,Nome,Permissao FROM professor WHERE Matricula = ?', [matricula])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

const cadastroProfessor = async (req,res) => {
    const nome = req.nome;
    const matricula = parseInt(req.matricula);
    const senha = await hash.hashPassword(req.senha);
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

module.exports = {
    getProfessorByMatricula,
    cadastroProfessor
}