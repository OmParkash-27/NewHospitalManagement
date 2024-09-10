const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    mobile: {
        type: Number
    },
    desease: {
        type: String
    },
    dates: {
        type: Array
    },
    appointment: {
        type: Array
    },
    madicines: {
        type: Array
    },
    deseaseDetails: {
        type: Array
    },
    d_id: {
        type: String
    }

});

module.exports = new mongoose.model('patients', patientSchema);