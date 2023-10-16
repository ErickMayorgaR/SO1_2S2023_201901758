const express = require('express')
const cors = require('cors')
const  morgan = require('morgan')
const router = require('./Router/routes')

const port = 5000;

const app = express();

app.use(cors());

app.set('port', port);

app.set('json spaces', 2);

app.use(function (req, res, next) {
    // Agrega las siguientes cabeceras CORS a todas las respuestas
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(app.get('port'), () => {
    console.log(`SERVIDOR EN PUERTO: ${app.get('port')}`);
});


exports.chat = app;