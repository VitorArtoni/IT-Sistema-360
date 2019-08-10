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

const marcarFalta = async function (req, res) {
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const idAula = parseInt(req.idAula);
    const falta = parseFloat(req.falta);

    const marcarFalta = await connection.query('INSERT INTO aluno_presente_aula (RA,Turma,idAula,Falta) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE Falta=VALUES(Falta)', [ra,idTurma,idAula,falta])
        .catch(err => {
            console.log(err);
            throw err;
        })

    const [faltasAluno,totalAulas] = await Promise.all(
        [
            connection.query('SELECT COALESCE(SUM(ROUND(Falta,2)),0) AS faltas FROM aluno_presente_aula WHERE RA = ? AND Turma = ?',[ra,idTurma]),
            connection.query('SELECT COALESCE(COUNT(a.idAula),0) * t.horasAula AS total FROM aula a INNER JOIN turma t ON a.idTurma = t.idTurma WHERE a.idTurma = ?',[idTurma])
        ]
    );

    const status = (parseFloat(faltasAluno[0].faltas) / parseFloat(totalAulas[0].total)) > 0.25 ? 'Reprovado por Falta' : 'Em Andamento';
    
    await connection.query('UPDATE aluno_turma SET Status=? WHERE idTurma = ? AND Aluno_RA = ?', [status,idTurma,ra]);
    return marcarFalta;
}

module.exports = {
    getDataDaAula,
    criarAula,
    marcarFalta
}