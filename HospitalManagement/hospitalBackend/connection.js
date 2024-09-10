
// const mongoose = require('mongoose');
// try {
//     mongoose.connect("mongodb://127.0.0.1:27017/hospital").then(()=> {
//         console.log("connection created with db");
//     })
// } catch(err) {
//     console.log("connection failed------", err);
// }

const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospital";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection created with DB");
    })
    .catch(err => {
        console.log("Connection failed ------", err);
    });
