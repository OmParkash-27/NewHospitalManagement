const patientModel = require('../models/patientSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

const  pController = new patientController();

router.get('/patientApi', pController.getAllPatient);

router.get('/patientApi/:_id', pController.getPatientById);

router.get('/patientApiMobile/:mobile', pController.getPatientById);

router.get('/patientsDoctorApi/:d_id', pController.getPatientById);

router.post('/patientApi', pController.savePatient);

router.get('/patientApiChart', pController.patientApiChart);


router.get('/patientApiChartForDoctor/:d_id', pController.patientApiChartForDoctor);

router.put('/patientApi/:_id', pController.updatePatient); 


router.put('/patientApi/:_id/:status', pController.updateNewEntryPatient)

module.exports = router;