const connection = require('../database');

const getDataDaAula = async function (req, res) {
    const idTurma = req;

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
    const idTurma = req.idTurma;
    const data = req.data;

    //Primeiro verificar se a turma já foi cadastrada
    return await connection.query('SELECT idTurma FROM turma WHERE idTurma = ?', [idTurma])
        .then(result => {
            if (result[0])
                return connection.query('INSERT INTO aula (idAula,idTurma,Data) VALUES (?,?,?)', [null, idTurma, data])
            else
                return 'turma_nao_existe';
        })
        .then(result2 => {
            return result2;
        })
        .catch(err => {
            console.log(err);
            return next();
        })
}

const marcarPresenca = async function (req, res) {
    const ra = req.ra;
    const idTurma = req.idTurma;
    const idAula = parseInt(req.idAula);
    const presenca = parseFloat(req.presenca);

    return await connection.query('INSERT INTO aluno_presente_aula (RA,Turma,idAula,Presenca) VALUES (?,?,?,?)', [ra,idTurma,idAula,presenca])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    getDataDaAula,
    criarAula,
    marcarPresenca
}