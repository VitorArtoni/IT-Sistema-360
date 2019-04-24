const connection = require('../database');

const getDataDaAula = async function (req, res) {
    let idTurma = req;

    return await connection.query('SELECT * FROM aula WHERE idTurma = ?', [idTurma])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
};

const criarAula = async function (req, res) {
    let idTurma = req.idTurma;
    let data = req.data;

    //Primeiro verificar se a turma já foi cadastrada
    return await connection.query('SELECT idTurma FROM turma WHERE idTurma = ?', [idTurma])
        .then(result => {
            if (result[0])
                return connection.query('INSERT INTO aula (idAula,idTurma,Data) VALUES (?,?,?)', [null, idTurma, data])
            else
                return null;
        })
        .then(result2 => {
            return result2;
        })
        .catch(err => {
            console.log(err);
            return next();
        })
}

module.exports = {
    getDataDaAula,
    criarAula
}