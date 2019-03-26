const connection = require('../database');
const bcrypt = require('bcryptjs');

const cadastroAluno = async function (req, res) {
    let nome = req.nome;
    let ra = parseInt(req.ra);
    let senha = await hashPassword(req.senha);

    return await connection.query('INSERT INTO `aluno` (`RA`, `Nome`, `Senha`) VALUES (?,?,?)', [ra, nome, senha])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
};

async function hashPassword (senha) {
    const hashedPassword = await new Promise((resolve,reject) => {
        bcrypt.hash(senha,parseInt(process.env.salt),function(err,hash){
            if (err) reject (err)
            resolve(hash);
        });
    });
    return hashedPassword;
}

module.exports = {
    cadastroAluno
}