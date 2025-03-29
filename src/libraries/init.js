const path = require('path');
const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: path.join(__dirname, '..', '..', 'database', 'urls.db'),
    },
    useNullAsDefault: true
});

async function InitializeDatabase() {
    await knex.schema.createTableIfNotExists('urls', function (t)
    {
        t.string('shortcode', 12);
        t.text('url');

        t.primary('shortcode');
    });
};

module.exports.init = InitializeDatabase;
module.exports.sql = knex;