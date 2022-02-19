// this file is a 'central hub for all "routing" funcs we may want to add


const router = require('express').Router();
const animalRoutes = require('./animalRoutes');
const zookeeperRoutes = require('./zookeeperRoutes');


router.use(animalRoutes);
router.use(zookeeperRoutes);

module.exports = router;