const connection = require('../database');

const inserirContribuicao = async (req, res) => {
    const idTopico = req.idTopico;
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const nota = req.nota;

    return await connection.query('INSERT INTO contribuicao (idTopico,RA,idTurma,Nota) VALUES (?,?,?,?)', [idTopico, ra, idTurma, nota])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const calcularEficiencia = async (req, res) => {
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;

    const n_topicos = await connection.query('SELECT COUNT(*) AS COUNT FROM topico WHERE idTurma = ?', [idTurma]);
    const intervencoes = await connection.query('SELECT COUNT(*) AS COUNT FROM contribuicao WHERE idTurma = ? AND RA = ?', [idTurma, ra]);
    const eficiencia = await connection.query('SELECT (SUM(NOTA)/?/?)*? AS EFICIENCIA FROM contribuicao WHERE RA = ? AND idTurma = ?', [n_topicos[0].COUNT,n_topicos[0].COUNT, intervencoes[0].COUNT, ra, idTurma]);

    return await connection.query('INSERT INTO participacao(RA,idTurma,Eficiencia) VALUES(?,?,?) ON DUPLICATE KEY UPDATE Eficiencia=VALUES(Eficiencia)', [ra, idTurma, eficiencia[0].EFICIENCIA])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const calcularEficienciaDaTurma = async (req,res) => {
    const idTurma = req;

    return await connection.query('call calcular_eficiencia(?)', [idTurma])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getNotas = async (req,res) => {
    const idTurma = req;

    return await connection.query('call calcular_participacao(?)', [idTurma])
        .then(async results => {
            return await connection.query('SELECT RA,Nota FROM participacao WHERE idTurma = ?', [idTurma])
        })
        .then(results2 => {
            return results2;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    inserirContribuicao,
    calcularEficiencia,
    calcularEficienciaDaTurma,
    getNotas
}