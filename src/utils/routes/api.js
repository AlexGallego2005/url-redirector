const express = require('express');
const { sql } = require('../../libraries/init');
const uuid = require('../shortcodes');
const router = express();

router.get('/api/shortcode/create', async (req, res) => {
    /** @type { string | undefined } */
    const url = decodeURIComponent(req?.query?.url);
    if (!url) return res.json({ error: 'You need to specify a URL' });

    /** @type { string | undefined } */
    var shortcode = (await sql('urls').select('shortcode').where('url', '=', url))?.at(0)?.shortcode;

    if (shortcode) return res.json({ url: `${ req.protocol }://${ req.hostname }${ req?.socket?.localPort == 443 ? '' : `:${ req?.socket?.localPort }` }/s/${ shortcode }`, shortcode: shortcode });
    
    shortcode = await uuid.generate();
    await sql('urls').insert({ 'url': url, 'shortcode': shortcode }).then( () => {
        return res.json({ url: `${ req.protocol }://${ req.hostname }${ req?.socket?.localPort == 443 ? '' : `:${ req?.socket?.localPort }` }/s/${ shortcode }`, shortcode: shortcode });
    });
});

router.get('/api/*', async (req, res) => {
    res.sendStatus(404);
});

module.exports = router;