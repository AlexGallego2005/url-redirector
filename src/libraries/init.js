const path = require('path');
const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', 'database', 'urls.db'),
    },
    useNullAsDefault: true
});

async function InitializeDatabase() {
    console.log(1, path.resolve(__dirname, '..', '..', 'database', 'urls.db'))
    const urlsTable = knex.schema.hasTable('urls');
    console.log(2, urlsTable)
    if (!urlsTable) await knex.schema.createTable('urls', function (t)
    {
        console.log(4)
        t.string('shortcode', 12);
        t.text('url');

        t.primary('shortcode');
    });
    console.log(3)

    return 1;
};

module.exports.init = InitializeDatabase;
module.exports.sql = knex;