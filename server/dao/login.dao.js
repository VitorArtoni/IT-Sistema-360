const connection = require('../database');

const loginProfessor = async function (req, res) {
    let matricula = req.matricula;

    return await connection.query('SELECT * FROM professor WHERE Matricula = ?', [matricula])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

const loginAluno = async function (req, res) {
    let ra = req;

    return await connection.query('SELECT * FROM aluno WHERE RA = ?', [ra])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

module.exports = {
    loginAluno,
    loginProfessor
}