const connection = require('../database');

const getObjetoByNome = async function (req, res) {
    let nome = parseInt(req);

    return await connection.query('SELECT * FROM objetos_de_avaliacao WHERE Nome_objeto LIKE ?', ['%' + nome + '%'])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}


const criarObjeto = async function (req, res) {
    let nome = req.nome;

    return await connection.query('INSERT INTO objetos_de_avaliacao (idObjetos_de_avaliacao	, Nome_objeto) VALUES (?,?)', [null, nome])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

module.exports = {
    getObjetoByNome,
    criarObjeto
}