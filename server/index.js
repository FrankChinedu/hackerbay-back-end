const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Routes = require('../routes');
const swagger = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
Routes(app);

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);
app.use(
    '/api-docs',
    swagger.serve,
    swagger.setup(swaggerDocument, { explorer: true })
);
app.use((req, res) => res.status(404).send({
    message: 'Not Found',
}));

module.exports = app;
