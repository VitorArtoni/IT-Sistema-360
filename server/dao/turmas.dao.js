const connection = require('../database');

const getTurmas = async function(req,res){
    return await connection.query('SELECT idTurma,Semestre,Ano FROM turma')
        .then(results => {
            return results;
        })
        .catch(err => console.log(err));
}

module.exports = {
    getTurmas
}