const dARModel = require('../models/docAdmRecSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const docAdmRecController = require('../controllers/docAdmRecController');

const dARC = new docAdmRecController();

router.post('/dARApiLogin', dARC.login);

router.post('/dARApi', dARC.saveData);

router.get('/dARApi', dARC.fetchAllDAR);
router.get('/dashboard', dARC.fetchAllDAR);

router.get('/dARApi/doctors', dARC.fetchDoctors);

router.get('/dARApi/:_id', dARC.getADRById);

router.put('/dARApi/:_id', dARC.udpateDAR);

router.delete('/dARApi/:_id', dARC.deleteDAR)



module.exports = router;

