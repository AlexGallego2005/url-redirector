const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { init } = require('./libraries/init');
const { port } = require('../config/server.json');

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use(require('./utils/routes/home'));
app.use(require('./utils/routes/help'));
app.use(require('./utils/routes/api'));
app.use(require('./utils/routes/redirect'));
app.use((req, res) => res.redirect('/'));

app.listen(port, async () => {
    console.log(`Servidor iniciado en :${ port }`);
    console.log('Inicializando la base de datos');
    await init().then(() => {
        console.log('database initialized');
    });
    console.log('La base de datos se ha inicializado')
});