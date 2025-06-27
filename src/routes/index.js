const express = require('express');
const animalController = require('../controllers/animalController');
const protocolController = require('../controllers/protocolController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController'); 
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/users/profile', protect, userController.getUserProfile);
router.put('/users/profile', protect, userController.updateUserProfile);

router.get('/animals', protect, animalController.index);
router.post('/animals', protect, authorizeRoles('Veterinário', 'Técnico'), animalController.create);
router.put('/animals/:id', protect, authorizeRoles('Veterinário', 'Técnico'), animalController.update);
router.delete('/animals/:id', protect, authorizeRoles('Veterinário'), animalController.destroy);
router.get('/animals/stats', protect, animalController.stats);

router.get('/protocols', protect, protocolController.index);
router.post('/protocols', protect, authorizeRoles('Veterinário', 'Técnico'), protocolController.create);
router.put('/protocols/:id', protect, authorizeRoles('Veterinário', 'Técnico'), protocolController.update);
router.delete('/protocols/:id', protect, authorizeRoles('Veterinário'), protocolController.destroy);
router.get('/protocols/stats', protect, protocolController.stats);

module.exports = router;
