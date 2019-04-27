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
            return err;
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
            return err;
        });
}

module.exports = {
    getAlunoByRa,
    cadastroAluno
}