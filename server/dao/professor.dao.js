const connection = require('../database');
const hash = require('../service/hashing');

const getProfessorByMatricula = async (req, res) => {
    let matricula = parseInt(req);

    return await connection.query('SELECT Matricula,Nome,Permissao FROM professor WHERE Matricula = ?', [matricula])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const cadastroProfessor = async (req, res) => {
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
            throw err;
        });
}

const atribuirTurmaAProfessor = async (req, res) => {
    const matricula = parseInt(req.matricula);
    const idTurma = req.idTurma;

    return await connection.query('INSERT INTO professor_leciona_turma (Matricula,idTurma) VALUES (?,?)', [matricula, idTurma])
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
}

module.exports = {
    getProfessorByMatricula,
    cadastroProfessor,
    atribuirTurmaAProfessor
}