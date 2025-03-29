const express = require('express');
const { sql } = require('../../libraries/init');
const { validate } = require('../shortcodes');
const router = express();

router.get('/s/:id', async (req, res) => {
    const id = req?.params?.id;

    if (!id) return res.redirect('/');
    else if (await validate(id) === 0) return res.redirect('/');

    const url = (await sql('urls').select('url').where('shortcode', '=', id?.replace('+', '')))?.at(0)?.url;
    if (id?.endsWith('+')) return res.json({ url: url });
    else return res.redirect(url);
});

module.exports = router;