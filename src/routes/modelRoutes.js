// routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

router.post('/models', modelController.createModel);
router.get('/models', modelController.getModels);
router.get('/models/names', modelController.getModelsNamesAndIds);

// Add more routes as needed
const apiKeyController = require('../controllers/ApiKeyController');
const hallucinationController = require('../controllers/HallucinationController');

router.post('/create-api-key', apiKeyController.createApiKey);
router.post('/authenticate-api-key', apiKeyController.authenticateApiKey);
router.post('/hallucination', hallucinationController.submitHallucination);
router.get('/hallucination', hallucinationController.getHallucination);

module.exports = router;
