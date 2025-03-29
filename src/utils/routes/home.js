const express = require('express');
const router = express();

router.get('/', (req, res) => {
    const url = req?.query?.url;

    if (!url) return res.render('index');
    
    try
    {
        new URL(url);
        return res.redirect(decodeURI(url));
    }
    catch (error)
    {
        return res.redirect('/');
    };
});

module.exports = router;