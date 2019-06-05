const connection = require('../database');

const getTopicoByName = async function (req, res) {
    let nome = req;

    return await connection.query('SELECT * FROM topico WHERE nomeTopico LIKE ?', ['%' + nome + '%'])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

const getTopicoByTurma = async function (req, res) {
    let idTurma= req;

    return await connection.query('SELECT * FROM topico WHERE idTurma = ?', [idTurma])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
}

const criarTopico = async function (req, res) {
    let idTopico = req.idTopico;
    let nome = req.nome;
    let idTurma = req.idTurma;
    let data = req.data;

    return await connection.query('INSERT INTO topico (idTopico, nomeTopico, idTurma, Data) VALUES (?,?,?,?)', [idTopico, nome, idTurma,data])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

module.exports = {
    getTopicoByName,
    getTopicoByTurma,
    criarTopico
}