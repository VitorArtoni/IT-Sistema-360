const connection = require('../database');
const hash = require('../service/hashing');

const getAlunoByRa = async (req, res) => {
    const ra = parseInt(req);

    return await connection.query('SELECT RA,Nome FROM aluno WHERE ra = ?', [ra])
        .then(results => {
            return results;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const preCadastroAluno = async (req, res) => {
    const nome = req.nome;
    const ra = parseInt(req.ra);

    return await connection.query('INSERT INTO aluno (RA, Nome, Senha) VALUES (?,?,?)', [ra, nome, ''])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const cadastrarSenhaAluno = async (req, res) => {
    const ra = parseInt(req.ra);
    const senha = await hash.hashPassword(req.senha);

    return await connection.query('SELECT RA FROM aluno WHERE RA = ? AND Senha = \'\'', [ra])
        .then(result => {
            if (result.length === 0)
                throw 'Aluno não cadastrado ou já criou uma senha';

            return true;
        })
        .then(async podeCriarSenha => {
            if (podeCriarSenha)
                return await connection.query('UPDATE aluno SET senha = ? WHERE RA = ?', [senha,ra])
                    .catch(err => { throw err });
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const atribuirAlunoATurma = async (req, res) => {
    const idTurma = req.idTurma;
    const idGrupo = req.idGrupo ? parseInt(req.idGrupo) : null;
    const ra = parseInt(req.ra);

    return await connection.query('INSERT INTO aluno_turma (idTurma, idGrupo, Aluno_RA) VALUES (?,?,?)', [idTurma, idGrupo, ra])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const alocarAlunoEmGrupo = async (req, res) => {
    const ra = parseInt(req.ra);
    const idTurma = req.idTurma;
    const idGrupo = parseInt(req.idGrupo);

    return await connection.query('UPDATE aluno_turma SET idGrupo = ? WHERE Aluno_RA = ? AND idTurma = ?', [idGrupo, ra, idTurma])
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const calcularNotasTurma = async (req, res) => {
    const idTurma = req;
    const pesoApresentacao = await connection.query('SELECT Valor FROM parametro WHERE Nome = "peso_nota" AND Chave = "apresentacao"');
    const pesoInteracao = await connection.query('SELECT Valor FROM parametro WHERE Nome = "peso_nota" AND Chave = "interacao"');
    const arrayNotas = await connection.query(`SELECT t.Aluno_RA AS RA, COALESCE((a.Nota + g.Nota_Grupo)/2, 0) AS NOTA_APRESENTACAO, COALESCE(p.Nota,0) AS NOTA_INTERACAO
                                              FROM atividade_grupo g
                                              INNER JOIN aluno_turma t ON g.idGrupo = t.idGrupo
                                              LEFT JOIN aluno_realiza_atividade a  ON t.Aluno_RA = a.Aluno_RA
                                              LEFT JOIN participacao p ON t.Aluno_RA = p.RA
                                              WHERE t.idTurma = ?`, [idTurma]);

    for (let i = 0; i < arrayNotas.length; i++) {
        const ra = parseInt(arrayNotas[i].RA);
        const notaApresentacao = parseFloat(arrayNotas[i].NOTA_APRESENTACAO) * parseFloat(pesoApresentacao[0].Valor);
        const notaInteracao = parseFloat(arrayNotas[i].NOTA_INTERACAO) * parseFloat(pesoInteracao[0].Valor);

        await connection.query('UPDATE aluno_turma SET Nota = ? WHERE Aluno_RA = ?', [notaApresentacao + notaInteracao,ra])
            .catch(err => console.log(err));
    }
}

module.exports = {
    getAlunoByRa,
    preCadastroAluno,
    atribuirAlunoATurma,
    alocarAlunoEmGrupo,
    calcularNotasTurma,
    cadastrarSenhaAluno
}