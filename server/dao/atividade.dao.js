const connection = require('../database');

const inserirAtividade = async function (req, res) {
    const idGrupo = req.idGrupo;
    const idTopico = req.idTopico;
    const idTurma = req.idTurma;
    const observacao = req.observacao ? req.observacao : '';
    const conformidade = req.conformidade ? parseFloat(req.conformidade) : 0.0;
    const interesse = req.interesse ? parseFloat(req.interesse) : 0.0;
    const contextualizacao = req.contextualizacao ? parseFloat(req.contextualizacao) : 0.0;
    const consistencia = req.consistencia ? parseFloat(req.consistencia) : 0.0;

    return await connection.query('INSERT INTO atividade_grupo(idGrupo,idTopico,idTurma,Observacao,Conformidade,Interesse,Contextualizacao,Consistencia) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE Observacao=VALUES(Observacao), Conformidade=VALUES(Conformidade), Interesse=VALUES(Interesse), Contextualizacao=VALUES(Contextualizacao), Consistencia=VALUES(Consistencia)', [idGrupo, idTopico, idTurma, observacao, conformidade, interesse, contextualizacao, consistencia])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const calcularMediaGrupo = async function (req, res) {
    const idGrupo = req.idGrupo;
    const idTopico = req.idTopico;
    const idTurma = req.idTurma;

    return await connection.query('UPDATE atividade_grupo SET Nota_Grupo = (Conformidade + Interesse + Contextualizacao + Consistencia)/4 WHERE idGrupo = ? AND idTopico = ? AND idTurma = ?', [idGrupo, idTopico, idTurma])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const inicializarAtividadeAlunos = async function (req, res) {
    const idGrupo = req.idGrupo;
    const idTopico = req.idTopico;
    const idTurma = req.idTurma;

    return await connection.query('call inicializar_alunos_atividade_grupo(?,?,?)', [idGrupo, idTopico, idTurma])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

module.exports = {
    inserirAtividade,
    calcularMediaGrupo,
    inicializarAtividadeAlunos
}