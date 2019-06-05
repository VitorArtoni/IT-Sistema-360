const connection = require('../database');

const inserirContribuicao = async (req,res) => {
    const idTopico = req.idTopico;
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const nota = req.nota;

    return await connection.query('INSERT INTO contribuicao (idTopico,RA,idTurma,Nota) VALUES (?,?,?,?)', [idTopico,ra,idTurma,nota])
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