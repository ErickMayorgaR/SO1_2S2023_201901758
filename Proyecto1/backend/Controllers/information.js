const connection = require('./database');

var direcciones = [];

async function getVMs(req, res) {
    try{
        const query = `SELECT DISTINCT ip FROM (SELECT ip FROM RAM LIMIT 250) AS subquery;`;

        const result = await executeQuery(query);

        direcciones = null;
        direcciones = [];
        // Iterar sobre los resultados y agregar las direcciones al arreglo
        result[0].forEach((row, index) => {
            direcciones.push({ [index + 1]: row.ip });
        });

        // Obtener el número máximo de elementos
        const maxElements = Math.max(...direcciones.map(item => Object.keys(item)[0]));

        // Filtrar el arreglo para obtener solo el elemento con el número máximo
        const filteredArray = direcciones.filter(item => Object.keys(item)[0] === maxElements.toString());

        
        return res.status(200).send([{"Valor" : Object.keys(filteredArray[0]).toString()}]);

    }catch(error){
        return res.status(500).send('Error al obtener datos de RAM:'+ error);
    }
}


async function getRamInfo(req, res) {
    try{
        const query = `SELECT * FROM RAM ORDER BY fecha DESC LIMIT 25`;

        const result = await executeQuery(query);

        return res.status(200).send(result[0]);

    }catch(error){
        return res.status(500).send('Error al obtener datos de RAM:'+ error);
    }
}


async function getCPUInfo(req, res) {
    try{
        const query = `SELECT *  FROM  CPU ORDER BY fecha DESC LIMIT 25`;
        
        const result = await executeQuery(query);

        return res.status(200).send(result[0]);


    }catch(error){

    }
}


async function insertCPUInformation(req, res) {
    try{
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { UsoCPU } = req.body;
    const query = `INSERT INTO CPU (porcentaje, fecha) VALUES (${UsoCPU}, NOW(),'${clientIP}')`

    executeQuery(query);

    return res.status(200).send("Elemento Insertado Exitosamente");
    }catch(error){
        return res.status(500).send('Error al insertar datos de CPU:'+ error);
    }
}


async function insertRAMInformation(req, res) {
    try {

        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const { porcentajeUso } = req.body;
        const query = `INSERT INTO RAM (porcentaje, fecha) VALUES (${porcentajeUso}, NOW(), '${clientIP}')`

        executeQuery(query);

        return res.status(200).send("Elemento Insertado Exitosamente");
    } catch (error) {
        return res.status(500).send('Error al insertar datos de RAM:' + error);
    }
}


async function executeQuery(query) {
    const result = await connection.promise().execute(query);
    return result;
}


function agregarIP(ip) {

    for (const direccion of direcciones) {
        if (direccion === ip) {
            return;
        }
    }

    direcciones.push(ip);
}


module.exports = {
    getRamInfo,
    getCPUInfo,
    insertCPUInformation,
    insertRAMInformation,
    agregarIP,
    getVMs
}
