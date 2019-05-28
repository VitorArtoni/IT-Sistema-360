const connection = require('../database');
const hash = require('../service/hashing');

const getAlunoByRa = async (req, res) => {
    const ra = parseInt(req);

    return await connection.query('SELECT RA,Nome FROM aluno WHERE ra = ?', [ra])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const cadastroAluno = async (req, res) => {
    const nome = req.nome;
    const ra = parseInt(req.ra);
    const senha = await hash.hashPassword(req.senha);

    return await connection.query('INSERT INTO aluno (RA, Nome, Senha) VALUES (?,?,?)', [ra, nome, senha])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const atribuirAlunoATurma = async (req, res) => {
    const idTurma = req.idTurma;
    const idGrupo = req.idGrupo ? parseInt(req.idGrupo) : null;
    const ra = parseInt(req.ra);

    return await connection.query('INSERT INTO aluno_turma (idTurma, idGrupo, Aluno_RA) VALUES (?,?,?)', [idTurma, idGrupo, ra])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const alocarAlunoEmGrupo = async (req,res) => {
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const idGrupo = parseInt(req.idGrupo);

    return await connection.query('UPDATE aluno_turma SET idGrupo = ? WHERE Aluno_RA = ? AND idTurma = ?',[idGrupo,ra,idTurma])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    getAlunoByRa,
    cadastroAluno,
    atribuirAlunoATurma,
    alocarAlunoEmGrupo
}