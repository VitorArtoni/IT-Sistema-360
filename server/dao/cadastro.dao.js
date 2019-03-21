const connection = require('../database');

const cadastroAluno = async function (req, res) {
    let nome = req.nome;
    let ra = parseInt(req.ra);
    let senha = req.senha;

    return await connection.query('INSERT INTO `aluno` (`RA`, `Nome`, `Senha`) VALUES (?,?,?)', [ra, nome, senha])
        .then(result => {
            return result;
        })
        .catch(err => {
            return next();
        });
};

module.exports = {
    cadastroAluno
}