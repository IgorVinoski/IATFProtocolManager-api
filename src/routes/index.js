const express = require('express');
const animalController = require('../controllers/animalController');
const protocolController = require('../controllers/protocolController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController'); // Importe o novo controlador de usuário
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Rotas de Autenticação
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rotas de Perfil do Usuário (Novas rotas adicionadas aqui)
// Garante que apenas o usuário autenticado possa acessar/modificar seu próprio perfil
router.get('/users/profile', protect, userController.getUserProfile);
router.put('/users/profile', protect, userController.updateUserProfile);

// Rotas de Animais
router.get('/animals', protect, animalController.index);
router.post('/animals', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.create);
router.put('/animals/:id', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.update);
router.delete('/animals/:id', protect, authorizeRoles('Veterinarian'), animalController.destroy);
router.get('/animals/stats', protect, animalController.stats);

// Rotas de Protocolos
router.get('/protocols', protect, protocolController.index);
router.post('/protocols', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.create);
router.put('/protocols/:id', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.update);
router.delete('/protocols/:id', protect, authorizeRoles('Veterinarian'), protocolController.destroy);
router.get('/protocols/stats', protect, protocolController.stats);

module.exports = router;
