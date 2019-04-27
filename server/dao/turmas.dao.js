const connection = require('../database');

const getTurmas = async function(req,res){
    return await connection.query('SELECT idTurma,Semestre,Ano FROM turma')
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

const criarTurma = async function(req,res){
    let idTurma = req.idTurma;
    let disciplina = req.disciplina;
    let semestre = req.semestre;
    let ano = parseInt(req.ano);

    return await connection.query('INSERT INTO turma (idTurma,Disciplina,Semestre,Ano) VALUES (?,?,?,?)', [idTurma,disciplina,semestre,ano])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

module.exports = {
    getTurmas,
    criarTurma
}