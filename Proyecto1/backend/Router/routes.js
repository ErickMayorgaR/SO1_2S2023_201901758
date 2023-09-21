const {Router} = require('express');
const router = Router();

const info = require('../Controllers/information');





router.get('/', (req, res) => {
    return res.status(200).send("Hola Mundo")
});


router.get('/getRamInfo',info.getRamInfo);
router.get('/getCPUInfo',info.getCPUInfo);
router.post('/insertCPUInformation',info.insertCPUInformation);
router.post('/insertRAMInformation',info.insertRAMInformation);


module.exports = router;