'use strict'

const bcrypt = require('bcryptjs');

async function hashPassword(senha) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(senha, parseInt(process.env.salt), function (err, hash) {
            if (err) reject(err)
            resolve(hash);
        });
    });
    return hashedPassword;
}

module.exports = {
    hashPassword
}