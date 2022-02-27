const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/protectRoutes');

router.get('/', isNotLoggedIn, (req, res) => {
    res.render('layouts/main.hbs');
});

module.exports = router;