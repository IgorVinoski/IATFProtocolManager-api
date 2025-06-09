// routes/index.js
const express = require('express');
const animalController = require('../controllers/animalController'); // Caminho relativo ajustado se necessário
const protocolController = require('../controllers/protocolController'); // Caminho relativo ajustado se necessário
const authController = require('../controllers/authController'); // Importe o novo controlador de autenticação
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Importe os middlewares

const router = express.Router();

// --- Rotas de Autenticação (públicas) ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// --- Rotas da API (protegidas) ---
// Aplica o middleware `protect` para todas as rotas abaixo
// e `authorizeRoles` para rotas que exigem papéis específicos.

// Rotas de Animals
router.get('/animals', protect, animalController.index);
router.post('/animals', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.create);
router.put('/animals/:id', protect, authorizeRoles('Veterinarian', 'Technician'), animalController.update);
router.delete('/animals/:id', protect, authorizeRoles('Veterinarian'), animalController.destroy); // Apenas Veterinarian pode deletar
router.get('/animals/stats', protect, animalController.stats);

// Rotas de Protocols
router.get('/protocols', protect, protocolController.index);
router.post('/protocols', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.create);
router.put('/protocols/:id', protect, authorizeRoles('Veterinarian', 'Technician'), protocolController.update);
router.delete('/protocols/:id', protect, authorizeRoles('Veterinarian'), protocolController.destroy);
router.get('/protocols/stats', protect, protocolController.stats);

module.exports = router;