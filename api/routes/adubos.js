// Importando bibliotecas
const { request } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

// Importando o modelo de produto
const Adubo = require('../models/adubo');
const Planta = require('../models/planta');

// Importando o controller adubos
const AdubosController = require('../controllers/adubos');

router.get('/', checkAuth, AdubosController.adubos_get_all);
router.get('/:AduboId', checkAuth, AdubosController.adubos_get_by_id);
router.post('/', checkAuth, AdubosController.adubos_cadastro);
router.patch('/:AduboId', checkAuth, AdubosController.adubos_patch_by_id);
router.delete('/:AduboId', checkAuth, AdubosController.adubos_delete_by_id);

module.exports = router;