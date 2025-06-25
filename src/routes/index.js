const express = require('express');
const animalController = require('../controllers/animalController');
const protocolController = require('../controllers/protocolController'); 
const authController = require('../controllers/authController'); 
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);


router.get('/animals', protect, animalController.index);
router.post('/animals', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.create);
router.put('/animals/:id', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.update);
router.delete('/animals/:id', protect, authorizeRoles('Veterinarian'), animalController.destroy); 
router.get('/animals/stats', protect, animalController.stats);

router.get('/protocols', protect, protocolController.index);
router.post('/protocols', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.create);
router.put('/protocols/:id', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.update);
router.delete('/protocols/:id', protect, authorizeRoles('Veterinarian'), protocolController.destroy);
router.get('/protocols/stats', protect, protocolController.stats);

module.exports = router;