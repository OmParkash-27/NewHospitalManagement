
const mongoose = require('mongoose');
try {
    mongoose.connect("mongodb://127.0.0.1:27017/hospital").then(()=> {
        console.log("connection created with db");
    })
} catch(err) {
    console.log("connection failed------", err);
}
