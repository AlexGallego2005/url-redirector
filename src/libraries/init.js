const path = require('path');
const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', 'database', 'urls.db'),
    },
    useNullAsDefault: true
});

async function InitializeDatabase() {
    const urlsTable = knex.schema.hasTable('urls');
    if (!urlsTable) await knex.schema.createTable('urls', function (t)
    {
        t.string('shortcode', 12);
        t.text('url');

        t.primary('shortcode');
    });
    
    return 1;
};

module.exports.init = InitializeDatabase;
module.exports.sql = knex;