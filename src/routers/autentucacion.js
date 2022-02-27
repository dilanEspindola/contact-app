const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/protectRoutes');

router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('auth/register.hbs');
});

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/contacts',
    failureRedirect: '/register'
}));

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login.hbs');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('auth/profile.hbs');
})

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;