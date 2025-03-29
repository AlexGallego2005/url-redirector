const express = require('express');
const router = express();

router.get('/ayuda', async (req, res) => {
    res.render('help');
});

module.exports = router;