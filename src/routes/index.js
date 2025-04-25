const express = require('express');
const animalController = require('../controllers/animalController');
const protocolController = require('../controllers/protocolController');

const router = express.Router();

router.get('/animals', animalController.index);
router.post('/animals', animalController.create);
router.put('/animals/:id', animalController.update);
router.delete('/animals/:id', animalController.destroy);
router.get('/animals/stats', animalController.stats);

router.get('/protocols', protocolController.index);
router.post('/protocols', protocolController.create);
router.put('/protocols/:id', protocolController.update);
router.delete('/protocols/:id', protocolController.destroy);
router.get('/protocols/stats', protocolController.stats);

module.exports = router;