const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: "34.67.54.164",
    user: "root",
    password: "password",
    database : "SO1PROYECTO2"
});


connection.connect(function (err) {
    if (err) {
      console.log(`DB not connected, ' + ${err.stack}`);
      return;
    }
      console.log('correct, DB connected.');
  });



async function getPorcentajeAprobacion(req, res) {
    try{
        const { curso } = req.query;
        const { semestre } = req.query;


        const queryAprobados = `
        SELECT COUNT(*)
        FROM alumno_cursos_calificaciones
        WHERE curso = '${curso}' AND semestre = '${semestre}'
        AND nota >= 61;
        `;
        const resultadoAprobados = await executeQuery(queryAprobados);

        const queryEstudiantes = `
        SELECT COUNT(*)
        FROM alumno_cursos_calificaciones
        WHERE curso = '${curso}' AND semestre = '${semestre}';
        `;

        const resultadoEstudiantes = await executeQuery(queryEstudiantes);

        const porcentajeAprobados = (resultadoAprobados[0][0]['COUNT(*)']/ resultadoEstudiantes[0][0]['COUNT(*)']) * 100;

        const enteroAprobados = Math.round(porcentajeAprobados);

        return res.status(200).json({
            data: enteroAprobados,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


async function getMejorPromedio(req, res) {
    try{
     // Obtenemos el semestre del parámetro
     const {semestre} = req.query;

     // Ejecutamos la consulta SQL
     const queryMejorPromedio = `
       SELECT carnet, AVG(nota) AS promedio
       FROM alumno_cursos_calificaciones
       WHERE semestre = '${semestre}'
       GROUP BY carnet
       ORDER BY promedio DESC
       LIMIT 5;
     `;
     const resultado = await executeQuery(queryMejorPromedio); 
    
    return res.status(200).json({
        estudiante: resultado[0],
      })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


async function getMayorCantidadEstudiantes(req, res) {
    try {
        const { semestre } = req.query
        // Obtenemos el curso con la mayor cantidad de alumnos
        const queryCantidadEstudiantes = `
          SELECT curso, COUNT(*) AS cantidad_estudiantes
          FROM alumno_cursos_calificaciones
          WHERE semestre = '${semestre}'
          GROUP BY curso
          ORDER BY cantidad_estudiantes DESC
          LIMIT 3;
        `;
        const resultadoCantidadEstudiantes = await executeQuery(queryCantidadEstudiantes);
    
        return res.json({
          mayorCantidadEstudiantes: resultadoCantidadEstudiantes[0]
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error en el servidor"
        });
      }
}


async function executeQuery(query){
    try{
        const result = await connection.promise().execute(query);
        return result;
    }catch(err){
        console.log(err);
        throw err;
    }
}


async function getInfo(req,res){
    try {
        const { semestre } = req.body
        // Obtenemos el curso con la mayor cantidad de alumnos
        const querySemestres = `
        SELECT DISTINCT semestre from alumno_cursos_calificaciones;`;
        const arraySemestres = await executeQuery(querySemestres);

        const queryCursos = `SELECT DISTINCT curso from alumno_cursos_calificaciones`;

        const arrayCursos = await executeQuery(queryCursos);

        return res.json({
          semestres: arraySemestres[0],
          cursos : arrayCursos[0]
        });

      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error en el servidor"
        });
      }
}



module.exports = {
    getPorcentajeAprobacion,
    getMejorPromedio,
    getMayorCantidadEstudiantes,
    getInfo
}