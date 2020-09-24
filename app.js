// A1
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const server = require('http').Server(app);

const notification = require('./controller/listen/productos');


const router = express.Router();

app.use(router);

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(notification);

server.listen(8090, () => {
    console.log('escuchando en el puerto '+8090);
});


process.on('SIGINT', () => {
    console.info('Señal SIGINT recibida.');

    // Evita que el servidor acepte nuevas conexiones y finaliza las conexiones existentes.
    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1)
        }
    });

    setTimeout(() => {
    }, 0);
});

process.on('message', (msg) => {
    if (msg == 'shutdown') {
        console.log('Cerrando todas las conexiones ...');
        setTimeout(() => {
            console.log('Terminado de cerrar las conexiones.');
            process.exit(0)
        }, 0);
    }
});