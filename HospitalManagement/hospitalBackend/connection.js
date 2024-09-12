
// const mongoose = require('mongoose');
// try {
//     mongoose.connect("mongodb://127.0.0.1:27017/hospital").then(()=> {
//         console.log("connection created with db");
//     })
// } catch(err) {
//     console.log("connection failed------", err);
// }

const mongoose = require('mongoose');

// const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospital";
const dbUri = 'mongodb+srv://ompysaini1999:ompy%401999@cluster0.qokls.mongodb.net/hospital?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection created with DB");
    })
    .catch(err => {
        console.log("Connection failed ------", err);
    });
