// Importando bibliotecas
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

// Importando o modelo de planta
const Planta = require('../models/planta');

// Importando o controller plantas
const PlantasController = require('../controllers/plantas');

router.get('/', checkAuth, PlantasController.plantas_get_all);
router.get('/:PlantaId', checkAuth, PlantasController.plantas_get_by_id);
router.post('/', checkAuth, PlantasController.plantas_cadastro);
router.patch('/:PlantaId', checkAuth, PlantasController.plantas_patch_by_id);
router.delete('/:PlantaId', checkAuth, PlantasController.plantas_delete_by_id);

module.exports = router;