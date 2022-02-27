const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

/*const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'contacto_app',
    port: 3307,
});*/

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if (error) {
        console.log(error);
    } else {
        connection.release();
        console.log('DB is connected');
    }
});

pool.query = promisify(pool.query);

module.exports = pool;