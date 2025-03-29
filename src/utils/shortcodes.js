const { sql } = require('../libraries/init');

/**
 * @returns { Promise<string> } shortcode
 */
async function shortcode()
{
    var nanoid = await import('nanoid');
    /** @type { string } */
    const uuid = nanoid.customAlphabet('1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm', 12)();

    /** @type { string | undefined } */
    const duplicated = (await sql('urls').select('shortcode').where('shortcode', '=', uuid))?.at(0)?.shortcode;
    if (duplicated) return await shortcode();

    return uuid;
};

/**
 * @param { string } code 
 * @returns { Promise<number> }
 */
async function validate(code) {
    if (code?.replace('+', '')?.match(/[aA0-zZ9]/) && code?.replace('+', '')?.length === 12) return 1;
    else return 0;
};

module.exports.generate = shortcode;
module.exports.validate = validate;