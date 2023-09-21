const connection = require('./database');

var direcciones = [];

async function getRamInfo(req, res) {
    try{
        const query = `SELECT * FROM RAM LIMIT 100`;

        const result = await executeQuery(query);

        return res.status(200).send(result[0]);

    }catch(error){
        return res.status(500).send('Error al obtener datos de RAM:'+ error);
    }
}


async function getCPUInfo(req, res) {
    try{
        const query = `SELECT *  FROM CPU LIMIT 100`;
        
        const result = await executeQuery(query);

        return res.status(200).send(result[0]);


    }catch(error){

    }
}


async function insertCPUInformation(req, res) {
    try{
    console.log(req.body);

    const { UsoCPU } = req.body;
    const query = `INSERT INTO CPU (porcentaje, fecha) VALUES (${UsoCPU}, NOW())`

    executeQuery(query);

    return res.status(200).send("Elemento Insertado Exitosamente");
    }catch(error){
        return res.status(500).send('Error al insertar datos de CPU:'+ error);
    }
}


async function insertRAMInformation(req, res) {
    try {
        console.log(req.body);

        const { porcentajeUso } = req.body;
        const query = `INSERT INTO RAM (porcentaje, fecha) VALUES (${porcentajeUso}, NOW())`

        executeQuery(query);

        return res.status(200).send("Elemento Insertado Exitosamente");
    } catch (error) {
        return res.status(500).send('Error al insertar datos de RAM:' + error);
    }
}


async function executeQuery(query) {
    const result = await connection.promise().execute(query);
    console.log(result);
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
    agregarIP
}
