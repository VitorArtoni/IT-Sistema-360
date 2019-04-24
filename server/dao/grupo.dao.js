const connection = require('../database');

const getGrupoById = async function (req, res) {
    let id = parseInt(req);
    
    return await connection.query('SELECT * FROM grupo WHERE idGrupo = ?', [id])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
};

const getGrupoByNome = async function (req, res) {
    let nome = req;
    console.log(nome);
    
    return await connection.query('SELECT * FROM grupo WHERE NomeGrupo = ?', [nome])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
}

const criarGrupo = async function (req,res){
    let nome = req.nome;

    return await connection.query('INSERT INTO grupo (idGrupo, NomeGrupo) VALUES (?,?)', [null,nome])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

module.exports = {
    getGrupoById,
    getGrupoByNome,
    criarGrupo
}