const dARModel = require('../models/docAdmRecSchema');
const commonService = require('../services/commonService');

// const commnonService = new commonService();

module.exports = class docAdmRecController {
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const userType = req.body.userType;
            commonService.authenticateUser(email, password, userType).then((result) => {
                if (result.length < 1) {
                    res.send({ 'authenticate': 'failed', 'statusCode': '400' });
                } else {
                    res.send({ 'authenticate': 'success', 'statusCode': '200', 'userData': result[0] });
                }
            })
        } catch (err) {
            console.log("error------->>>>>>>>>>>>>", err);
        }
    }

    saveData(req, res) {
        commonService.saveInDb(dARModel, req.body).then((data) => {
            res.status(200).send({'message': 'successfully saved'});
        }).catch((err)=> {
            console.log("error during data save", err)
            res.send({message: 'data not saved'});
        });
    }

    fetchAllDAR(req, res) {
        commonService.fetchAll(dARModel).then((result) => {
            res.send(result);
        }).catch((err) => console.log("errrrrrrrrrrr",err));    
    }

    fetchDoctors(req, res) {
        commonService.getDataByField(dARModel, 'userType', 'doctor').then((data)=> {
            res.send(data);
        }).catch((err) => console.log(err))
    }

    getADRById(req, res) {
       commonService.getDataById(dARModel, req.params).then((data)=> {
        res.send(data)
       }).catch((err) => console.log(err))
    }

    udpateDAR(req, res) {
        commonService.updateOne(dARModel, req.params, req.body).then((data)=> {
            if(data.acknowledged)  res.send({message: 'successsfully updated', data: data});
            res.send({message: "data not updated"});
        }).catch((err) => console.log(err))
    }

    deleteDAR(req, res) {
        // console.log(req.params);
        commonService.deleteOne(dARModel, req.params).then((data)=> {
            if(data.acknowledged)  res.send({message: 'successsfully deleted', data: data});
            else res.send({message: "data not deleted"});
        }).catch((err) => console.log(err))
    }
}
