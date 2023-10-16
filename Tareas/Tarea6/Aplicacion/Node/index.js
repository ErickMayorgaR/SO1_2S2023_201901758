const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const socketio = require('socket.io')

const redisController = require('./redis/controller')

const port = 4000;

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

app.get('/', (req, res) => {
    res.send('Hola, mundo!');
});

const server = app.listen(app.get('port'), () => {
    console.log(`SERVIDOR EN PUERTO: ${app.get('port')}`);
});

const io = socketio(server, {
    cors: {
      origin: '*',
      headers: ['Authorization', 'Content-Type'],
    }
  });


io.on('connection', (socket) => {
    let dataArray = [];
    console.log("Se conecto un cliente");
    socket.on("keyRedis", data => {
        console.log("Se conecto a KeyRedis");

        setInterval(async () => {
            const result = await redisController.getRedisData();
            if (result == "Error") {
                console.log(result);
            }else{
                socket.emit('keyRedis',result);
            }
        }, 100);
    })
});


exports.chat = app;