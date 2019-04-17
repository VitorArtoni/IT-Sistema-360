'use strict'

const db = require('../../dao/turmas.dao');

const getTurmas = (req, res) => {
    db.getTurmas()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.send(null);
        })
}

module.exports = {
    getTurmas
}