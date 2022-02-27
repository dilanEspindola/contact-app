const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/protectRoutes');

router.get('/', isLoggedIn, async (req, res) => {
    const sql = await pool.query('select * from contacts where id_usuario = ?', [req.user.id]);
    res.render('contactos/list_contacts.hbs', { sql });
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('contactos/add_contact.hbs');
});

router.post('/add', async (req, res) => {
    const { contact_name, phone_contact } = req.body;
    const newContact = { contact_name, phone_contact, id_usuario: req.user.id };
    try {
        await pool.query('insert into contacts set ?', [newContact]);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/contacts');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const editSql = await pool.query('select * from contacts where id = ?', [id]);
    res.render('contactos/edit_contact.hbs', { edit: editSql[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { contact_name, phone_contact } = req.body;
    const updateContact = { contact_name, phone_contact };
    try {
        await pool.query('update contacts set ? where id = ?', [req.body, id]);
        res.redirect('/contacts');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('delete from contacts where id = ?', [id]);
    res.redirect('/contacts');
});

module.exports = router;