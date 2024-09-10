const mongoose = require('mongoose');
const dARSchema = new mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    mobile: {
        type: Number
    },
    userType: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    speciality: {
        type: Array
    }
});

module.exports = new mongoose.model('docAdmRecs', dARSchema);