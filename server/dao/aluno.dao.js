const connection = require('../database');
const hash = require('../service/hashing');

const cadastroAluno = async (req, res) => {
    const nome = req.nome;
    const ra = parseInt(req.ra);
    const senha = await hash.hashPassword(req.senha);

    return await connection.query('INSERT INTO aluno (RA, Nome, Senha) VALUES (?,?,?)', [ra, nome, senha])
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

module.exports = {
    cadastroAluno
}