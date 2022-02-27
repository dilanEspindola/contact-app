const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const encrypt = require('./encript');

passport.use('local.register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await encrypt.hashPassword(password);
    const result = await pool.query('insert into usuarios set ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select * from usuarios where id = ?', [id]);
    done(null, rows[0]);
});

passport.use('local.login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const getUsername = await pool.query('select * from usuarios where username = ?', [username]);
    if (getUsername.length > 0) {
        const user = getUsername[0];
        const passwordValidation = await encrypt.comparePassword(password, user.password);
        if (passwordValidation) {
            done(null, user);
        } else {
            done(null, false)
        }
    } else {
        done(null, false)
    }
}
));