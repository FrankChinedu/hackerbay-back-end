const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Routes = require('../routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
Routes(app);

app.use((req, res) => res.status(404).send({
    message: 'Not Found',
}));

module.exports = app;
