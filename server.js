require('dotenv').config();
require('./src/database/dbconfig/DB_mongodb_connection');
const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const modelRoutes = require('./src/routes/modelRoutes');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use('/api', modelRoutes);

app.use(logger('dev'));
app.use(Utilities.send404);
app.disable('x-powered-by');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
const port = 3000;
const server = app
    .listen(port || process.env.APP_PORT, () => {
        console.log(
            `********** Server is running on  http://localhost:${
                server.address().port
            }  **********`,
        );
    })
    .on('error', (error) => {
        console.log(
            '********** \x1b[31mPort ' +
                error.port +
                ' is already in use\x1b[0m **********',
        );
    });
