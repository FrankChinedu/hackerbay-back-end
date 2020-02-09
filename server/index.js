const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Routes = require('../routes');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
Routes(app);

app.get('*', (req, res) => res.status(404).send({
    message: 'Not Found',
}));

module.exports = app;
