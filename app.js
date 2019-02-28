const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    PORT = 3000,
    NODE_ENV = 'dev',
    SESS_NAME = 'test',
    SESS_LIFETIME = TWO_HOURS,
    SESS_SECRET = 'd0nt_t311_4ny1'
} = process.env

const IN_PROD = NODE_ENV === 'prod';
const users = [
    { id: 1, name: 'Vitor', email: 'vitor@teste.com', password: 'teste123' },
    { id: 2, name: 'User1', email: 'user1@teste.com', password: 'teste123' },
    { id: 3, name: 'User2', email: 'user2@teste.com', password: 'teste123' },
]

const redirectLogin = (req, res, next) => {
    if (!req.session.userId)
        res.redirect('/login');
    else
        next();
}

const redirectHome = (req, res, next) => {
    if (req.session.userId)
        res.redirect('/home');
    else
        next();
}

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}));

app.use((req, res, next) => {
    const { userId } = req.session;
    if (userId) {
        res.locals.user = users.find(user => user.id === userId);
    }
    next();
});

app.get('/home', redirectLogin, (req, res) => {
    const { user } = res.locals;
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/', (req, res) => {
    const { userId } = 1;
    res.send('Hello World!');
});

app.get('/login', redirectHome, (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/register', redirectHome, (req, res) => {
    res.sendFile(path.join(__dirname + '/cadastro.html'));
});

app.post('/login', redirectHome, (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if (user) {
            req.session.userId = user.id;
            return res.redirect('/home');
        }
    }
    res.redirect('/login');
});

app.post('/register', redirectHome, (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
        const exists = users.some(
            user => user.email === email
        )

        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }
            users.push(user);
            req.session.userId = user.id;
            return res.redirect('/login');
        }
    }
    res.redirect('/register');
});

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie(SESS_NAME);
        res.redirect('/login');
    });
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
