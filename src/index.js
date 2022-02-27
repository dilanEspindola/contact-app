const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
//const pool = require('./database');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
require('./lib/passportAuth');

const app = express();
const PORT = process.env.PORT || 4000;

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.use(session({
    secret: 'contacto-app',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport
app.use(passport.initialize());
app.use(passport.session());

// globals
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// routes
app.use(require('./routers/index'));
app.use(require('./routers/autentucacion'));
app.use('/contacts', require('./routers/contacto'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// server
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`);
});