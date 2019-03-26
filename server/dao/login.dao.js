const connection = require('../database');

const loginProfessor = function (req, res) {
    let matricula = req.body.matricula;
    let senha = req.body.senha;

    connection.query('SELECT * FROM Professor WHERE matricula= ?', [matricula],
        function (error, results, fields) {
            if (error) {
                console.log("Ocorreu algum erro");
                res.send({
                    "code": 400,
                    "failed": "Ocorreu algum erro"
                })
            }
            else {
                if (results.length > 0) {
                    if (results[0].senha == senha) {
                        res.send({
                            "code": 200,
                            "success": "Login aceito"
                        });
                    }
                    else {
                        res.send({
                            "code": 204,
                            "success": "Matricula ou senha incorretas"
                        });
                    }
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Matricula não existe"
                    });
                }
            }
        });
};

const loginAluno = async function (req, res) {
    let ra = req.ra;

    return await connection.query('SELECT * FROM `aluno` WHERE `RA` = ?', [ra])
        .then(results => {
            return results;
        })
        .catch(err => console.log(err));
};

module.exports = {
    loginAluno,
    loginProfessor
}