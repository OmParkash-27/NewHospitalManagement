const express = require('express');
const app = express();
require('./connection');
const serverless = require('serverless-http');

const patientRouter = require('./routes/patientRoute');
const dARRouter = require('./routes/docAdmRecRoute');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'dist/hospital-frontend')));

app.use(patientRouter);
app.use(dARRouter);

app.use('/.netlify/functions/api', app);
app.listen(port, ()=> {
    console.log("server running on port no. ",port);
});
module.exports.handler = serverless(app);

