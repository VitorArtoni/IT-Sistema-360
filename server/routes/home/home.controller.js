'use strict'

const path = require('path');

const getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie(process.env.sess_name);
        res.redirect('/login');
    });
};

module.exports = {
    getHome,
    logout
}