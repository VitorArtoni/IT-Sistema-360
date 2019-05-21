const connection = require('../database');

const getRequisitoByNome = async function (req, res) {
    let nome = req;

    return await connection.query('SELECT * FROM requisitos_de_avaliacao WHERE Nome_requisito LIKE ?', ['%' + nome + '%'])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}


const criarRequisito = async function (req, res) {
    let nome = req.nome;

    return await connection.query('INSERT INTO requisitos_de_avaliacao (idRequisitos_de_avaliacao, Nome_requisito) VALUES (?,?)', [null, nome])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return next();
        });
}

module.exports = {
    getRequisitoByNome,
    criarRequisito
}