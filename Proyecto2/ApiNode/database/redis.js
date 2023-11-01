const redis = require('redis')
const redisClient = redis.createClient({
    url: 'redis://34.123.97.62:6379',
});


async function getSemestres(){
    try {
        await redisClient.connect();
        const data = await redisClient.smembers('semestres');

        return Number(data);
    } catch (error) {
        console.log(error);
        return "Error";
    }

}


async function getCursoAlumnos(curso){
    try {
        await redisClient.connect();
        const data = await redisClient.smembers(curso);

        return data;
    } catch (error) {
        console.log(error);
        return "Error";
    }

}


async function getCantidadRegistros() {
    try {
        await redisClient.connect();
        const data = await redisClient.get('numeroRegistros');

        return Number(data);
    } catch (error) {
        console.log(error);
        return "Error";
    }
}


module.exports = {
    getCantidadRegistros,
    getCursoAlumnos,
    getSemestres
}