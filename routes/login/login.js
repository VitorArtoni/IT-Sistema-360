var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_360'
});

connection.connect(function (err) {
    if (!err)
        console.log('Connected to database');
    else
        console.log('Could not connect to database ' + err);
});

exports.loginProfessor = function (req, res) {
    var matricula = req.body.matricula;
    var senha = req.body.senha;

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
}