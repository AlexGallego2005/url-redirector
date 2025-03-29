const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { init } = require('./libraries/init');
init();

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
app.use((req, res) => res.redirect('/'));

app.listen(5000, () => console.log('Servidor iniciado en :5000'));