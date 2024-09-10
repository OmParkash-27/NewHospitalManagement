const dARModel = require('../models/docAdmRecSchema');
module.exports =  class commonService {

    // static function only call with class name instead instance of class
    static async authenticateUser(email, password, userType) {
                const result = await dARModel.find({ 'email': email, 'userType': userType, 'password': password });
                //console.log("result is: ", result); //give promise data
                return result;
            }

    static async saveInDb(model, body) {
        try {
            let data = new model(body);
            let result = await data.save();
            return result;
        } catch(err) {
            return err;
        }
    }

    static async fetchAll(model) {
        try {
            const data = await model.find({});
            return data;
        } catch(err) {
            return err;
        }
    }

    static async getDataByField(model, field, value) {
        try {
            const data = await model.find({[field]: value});
            return data;
        } catch(err) {
            return err;
        }
    }

    static async getDataById(model, id) {
            try {
                if(typeof id === 'string') {
                    id = {_id : id}
                }
                const data = await model.find(id);
                return data
            } catch(err) {
                console.log("while getting-------------->>>>>>>>", err);
                return err;
            }
    }

    static async updateOne(model, id, body) {
        try {
            if(typeof id === 'string') {
                id = {_id : id}
            }
            const data = await model.updateOne(id, {$set: body});
            return data;
        } catch(err) {
            console.log("while updating---------->>>>>>>>>>>>>", err);
            return err;
        }
    }

    static async deleteOne(model, id) {
        try {   
            const data = await model.deleteOne(id);
            return data;
        } catch(err) {
            console.log("while deleting----------->>>>>>>.", err);
            return err;
        }
    }


}
