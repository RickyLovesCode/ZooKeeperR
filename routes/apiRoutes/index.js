// this file is a 'central hub for all "routing" funcs we may want to add


const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');


router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));

module.exports = router;