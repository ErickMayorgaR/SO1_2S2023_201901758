const connection = require('./database');

var direcciones = [];

async function postkillProcess(req, res) {
    try {
        let { pid } = req.body;
        const { maquina } = req.body;
        pid = parseInt(pid);

        if (maquina == null) {
            maquina = 1;
        }

        const ip = direcciones[maquina - 1][maquina];

        const url = `http://${ip}:8080/killProcess`;

        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ pid }),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await data.json();

        if(response.status === error) {
            return res.status(500).send('Error al obtener datos de PID');
        }
       
        return res.status(200).send(data);

    } catch (error) {
        return res.status(500).send('Error al obtener datos de PID:' + error);
    }
}

async function getRequest (url, headers){
    const response = await fetch(url, {
      headers,
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al realizar la petición GET");
    }
  };


async function getPIDInfo(req, res) {
    try {
        let { maquina } = req.query;

        if (maquina == null) {
            maquina = 1;
        }

        const ip = direcciones[maquina - 1][maquina];

        const url = `http://${ip}:8080/getPIDCPU`;

        const data = await getRequest(url);

        return res.status(200).send(data);

    } catch (error) {
        return res.status(500).send('Error al obtener datos de PID:' + error);
    }
}


async function getVMs(req, res) {
    try {
        const query = `SELECT DISTINCT ip FROM (SELECT ip FROM RAM ORDER BY fecha DESC LIMIT 100) AS subquery;`;

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
        return res.status(200).send([{ "Valor": Object.keys(filteredArray[0]).toString() }]);

    } catch (error) {
        return res.status(500).send('Error al obtener datos de RAM:' + error);
    }
}


async function getRamInfo(req, res) {
    try {
        let { maquina } = req.query;

        if (maquina == null) {
            maquina = 1;
        }

        const ip = direcciones[maquina - 1][maquina];
        const query = `SELECT * FROM RAM WHERE ip = "${ip}" ORDER BY fecha DESC LIMIT 25`;

        const result = await executeQuery(query);

        return res.status(200).send(result[0]);

    } catch (error) {
        return res.status(500).send('Error al obtener datos de RAM:' + error);
    }
}


async function getCPUInfo(req, res) {
    try {

        let { maquina } = req.query;

        if (maquina == null) {
            maquina = 1;
        }

        const ip = direcciones[maquina - 1][maquina];
        const query = `SELECT * FROM CPU WHERE ip = "${ip}" ORDER BY fecha DESC LIMIT 25`;

        const result = await executeQuery(query);


        return res.status(200).send(result[0]);


    } catch (error) {

    }
}


async function insertCPUInformation(req, res) {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ip4 = clientIP.substring(7);
        const { UsoCPU } = req.body;
        const query = `INSERT INTO CPU (porcentaje, fecha, ip) VALUES (${UsoCPU}, NOW(),'${ip4}')`

        await executeQuery(query);

        return res.status(200).send("Elemento Insertado Exitosamente");
    } catch (error) {
        return res.status(500).send('Error al insertar datos de CPU:' + error);
    }
}


async function insertRAMInformation(req, res) {
    try {

        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ip4 = clientIP.substring(7);
        const { porcentajeUso } = req.body;
        const query = `INSERT INTO RAM (porcentaje, fecha, ip) VALUES (${porcentajeUso}, NOW(), '${ip4}')`

        await executeQuery(query);

        return res.status(200).send("Elemento Insertado Exitosamente");
    } catch (error) {
        return res.status(500).send('Error al insertar datos de RAM:' + error);
    }
}


async function executeQuery(query) {
    try {
        const result = await connection.promise().execute(query);
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
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
    getVMs,
    getPIDInfo,
    postkillProcess
}
