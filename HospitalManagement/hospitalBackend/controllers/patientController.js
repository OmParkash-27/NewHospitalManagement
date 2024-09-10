const patientModel = require('../models/patientSchema');
const commonService = require('../services/commonService')
module.exports = class PatientController {

    constructor() {
        this.updateNewEntryPatient = this.updateNewEntryPatient.bind(this);
        this.addExtraData = this.addExtraData.bind(this); // Bind the method to the instance. use of it because a function can't call another function of same class without bind or without making function as arrow func.
    }

    getAllPatient(req, res) {
        commonService.fetchAll(patientModel).then((result)=> {
            res.send(result);
        }).catch((err)=> console.log(err));
    }

    getPatientById(req, res) {
        commonService.getDataById(patientModel, req.params).then((data)=> {
         res.send(data)
        }).catch((err) => console.log(err))
     }

     savePatient(req, res) {
        commonService.saveInDb(patientModel, req).then((data) => {
            res.status(200).send({'message': 'successfully saved'});
        }).catch((err)=> {
            console.log("error during data save", err)
            res.send({message: 'data not saved'});
        });
    }

    async updatePatient(req, res) {
        try {
            const patientArray = await commonService.getDataById(patientModel, req.params);
            const patient = patientArray[0];
            // console.log("and fetch patients previous data before updating",patient);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }

            // Update the properties you want to change
            patient.name = req.body.name;
            patient.age = req.body.age;
            patient.gender = req.body.gender;
            patient.address = req.body.address;
            patient.mobile = req.body.mobile;
            patient.desease = req.body.desease;
            patient.d_id = req.body.d_id;
    
            // Update the last items in the arrays
            if (patient.dates.length != null && patient.dates.length > 0) {
                console.log(patient.dates);
                const lastDateIndex = patient.dates.length - 1;
                patient.dates[lastDateIndex] = req.body.dates;
            } 
    
                if (patient.madicines.length > 0 && patient.madicines != null) {
                    const lastMadicineIndex = patient.madicines.length - 1;
                    patient.madicines[lastMadicineIndex] = req.body.madicines;
                } else {
                   patient.madicines[0] = req.body.madicines;
                }
    
            if (patient.deseaseDetails.length > 0 && patient.deseaseDetails != null) {
                const lastDiseaseDetailIndex = patient.deseaseDetails.length - 1;
                patient.deseaseDetails[lastDiseaseDetailIndex] = req.body.deseaseDetails;
            } else {
                patient.deseaseDetails[0] = req.body.deseaseDetails;
            }
    
            if (patient.appointment != null && patient.appointment.length > 0) {
                const lastAppointmentIndex = patient.appointment.length - 1;
                patient.appointment[lastAppointmentIndex] = req.body.appointment;
            } else {
                if(patient.appointment != null){
                    const lastAppointmentIndex = patient.appointment.length - 1;
                    patient.appointment[lastAppointmentIndex + 1] = req.body.appointment;
                } else {
                    // console.log("find null appointment---");
                    patient.appointment = req.body.appointment;
                }
            }
    
            // Save the updated document
            const updatedPatient = await commonService.saveInDb(patientModel, patient);
    
            res.send(updatedPatient);
        } catch(err) {
            console.log("error during update patient-------->>>>>", err);
        }
    }

    async updateNewEntryPatient(req, res) {
        console.log("listen in put method for new Entry of patient");
        try {
            // console.log("-----params-----", req.params._id);
            const arrayOfPatient = await commonService.getDataById(patientModel, req.params._id);
            // console.log("arrayOfPatient---->>>>>>>", arrayOfPatient[0]);
            const currentPatient = arrayOfPatient[0];
            // console.log("current patient", currentPatient);
            let pushData = this.addExtraData(currentPatient, req.body);
            // console.log( "--------pushData", pushData);
            const data = await commonService.updateOne(patientModel, req.params._id, pushData);
            res.send(data);
        } catch(err) {
            console.log("error during new entry of patient-------->>>>>", err);
        }
    }
    
    addExtraData(patient, requestData) {
        console.log("-----------in addExtraData function----------");
        // console.log(patient);
        // console.log(requestData,"----------reqData");
        
        const datesLength = patient.dates.length;
        const dDetailsLength = patient.deseaseDetails.length;
        const medicinesLength = patient.madicines.length;
        //console.log(patient.appointment.length,"---------appointment length--------- appDate ",patient.appointment);
        patient.dates[datesLength] = requestData.dates;
        patient.deseaseDetails[dDetailsLength] = requestData.deseaseDetails;
        patient.madicines[medicinesLength] = requestData.madicines;
        
        if(patient.appointment != null && requestData.appointment != null) {              // can not use patient.appointment.length !== requestData.dates, if appointment is null.
            const appLength = patient.appointment.length;
            if(patient.appointment[appLength-1] != null) {
                console.log("last appointment is not null---");
                patient.appointment[appLength] = requestData.appointment;
            } else {
                console.log("last appointment is null---");
                patient.appointment[appLength] = requestData.dates;
            }
            
        } else if( patient.appointment == null && requestData.appointment == null) {
            console.log("in 1st elseIf part of appointment");
            patient.appointment = requestData.appointment;     // can not use appointment[0], if appointment is null
        } else if(patient.appointment == null && requestData.appointment != null) {
            console.log("in 2nd elseIf part of appointment");
            const cDateLength = patient.dates.length;
            patient.appointment == requestData.dates[cDateLength-1];
        } else {        // patient.appointment != null && requestData.appointment == null
            console.log("in else part of appointment");
            const appLength = patient.appointment.length;
            patient.appointment[appLength] = requestData.appointment
        }
    
        patient.name = requestData.name;
        patient.age = requestData.age;
        patient.gender = requestData.gender;
        patient.mobile = requestData.mobile;
        patient.desease = requestData.desease;
        patient.address = requestData.address;
        patient.d_id = requestData.d_id;
        return patient;
    }

    async patientApiChart(req, res) {
        try {
            //let currentYear = currentDate.getFullYear();
            const monthsDataCount = [];
            const data = await commonService.fetchAll(patientModel);
            // console.log("data", data);
            let currentMonth = 0;
            let count = 0;
            for(let i = 0; i<=11; i++) {
                 currentMonth = i+1;
                 count = 0;
                //  let dates = [];
                for(let j= 0; j< data.length; j++) {
                    let dates = data[j].dates;
                    console.log("dates of patient", data[j].dates);
                    for(let k = 0; k < dates.length; k++) {
                        let date = dates[k];
                        let dateMonth = new Date(date).getMonth() + 1;
                        // console.log("dateMonth", i+1, ": ", j+1, dateMonth);
                        if(dateMonth == currentMonth) {
                            count ++;
                        }
                    }
                }
                monthsDataCount[i] = count;            
                // console.log("currentMonth----", currentMonth);
            }
            // console.log(monthsDataCount);
            res.json(monthsDataCount);
        } catch(err) {
            console.log("error during gettig patients in graph-------->>>>>", err);
        }
    }

    async patientApiChartForDoctor(req, res) {
        try {
            //let currentYear = currentDate.getFullYear();
            const monthsDataCount = [];
            const data = await commonService.getDataByField(patientModel, 'd_id', req.params.d_id);
            // console.log("data doctor", data);
            let currentMonth = 0;
            let count = 0;
            for(let i = 0; i<=11; i++) {
                currentMonth = i+1;
                // currObjDates = data[i].dates;
                count = 0;
                for(let j= 0 ; j< data.length; j++) {
                    let dates = data[j].dates;
                    // console.log("DATES", dates);
                    for(let k = 0; k < dates.length; k++) {
                        let date = dates[k];
                        let dateMonth = new Date(date).getMonth() + 1;
                        // console.log("dateMonth: ", dateMonth);
                        if(dateMonth == currentMonth) {
                            count ++;
                        }
                    }
                }
                // console.log("month", currentMonth, 'patient--', count);
                monthsDataCount[i] = count;            
            }
            //console.log("monthsDataCountArray----", monthsDataCount);
            res.json(monthsDataCount);
        } catch(err) {
            console.log("error during gettig patients in graph-------->>>>>", err);
        }
    }

}