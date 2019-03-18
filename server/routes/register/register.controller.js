'use strict'

const path = require('path');

const getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/cadastro.html'));
}

const register = (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (name && email && password) {
        const exists = users.some(
            user => user.email === email
        )

        if (!exists) {
            const user = {
                ra: users.length + 1,
                name,
                email,
                password
            }
            users.push(user);
            req.session.userId = user.ra;
            return res.redirect('/login');
        }
    }
    res.redirect('/register');
};
module.exports = {
    getRegister,
    register
}