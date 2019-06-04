const connection = require('../database');

const inserirContribuicao = async (req,res) => {
    const idTopico = req.idTopico;
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const data = req.data;
    const nota = parseFloat(req.nota);

    return await connection.query('INSERT INTO contribuicao (idTopico,RA,idTurma,Data,Nota) VALUES (?,?,?,?,?)', [idTopico,ra,idTurma,data,nota])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    inserirContribuicao
}