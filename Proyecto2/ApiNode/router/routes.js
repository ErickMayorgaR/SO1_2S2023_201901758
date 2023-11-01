const {Router} = require('express');
const router = Router();
const controller = require('../database/mysql');


router.get("/getPorcentajeAprobacion", controller.getPorcentajeAprobacion);
router.get("/getMejorPromedio",controller.getMejorPromedio);
router.get("/getMayorCantidadEstudiantes", controller.getMayorCantidadEstudiantes);
router.get("/getInfo", controller.getInfo)

module.exports = router;