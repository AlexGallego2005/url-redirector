const express = require('express');
const router = express();

router.get('/api', async (req, res) => {
    res.render('help');
});

module.exports = router;