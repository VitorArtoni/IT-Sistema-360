const mysql = require('mysql');
const util = require('util');

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sistema_360'
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    else
        console.log('Connected to database');

    if (connection)
        connection.release();

    return
});

pool.query = util.promisify(pool.query);

module.exports = pool;