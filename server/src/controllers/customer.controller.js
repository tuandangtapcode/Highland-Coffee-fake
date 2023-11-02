const CustomersServices = require('../services/customers.services')

class CustomersController {

    async getAllCustomers(req, res) {
        const response = await CustomersServices.fncGetAllCustomers(req);
        return res.json(response);
    }

    async login(req, res) {
        const response = await CustomersServices.fncLogin(req);
        return res.json(response);
    }

    async register(req, res) {
        const response = await CustomersServices.fncRegister(req, res);
        return res.json(response);
    }

    async forgotPassword(req, res) {
        const response = await CustomersServices.fncForgotPassword(req);
        return res.json(response);
    }

    async changePassword(req, res) {
        const response = await CustomersServices.fncChangePassword(req);
        return res.json(response);
    }

    async getUserByEmail(req, res) {
        const response = await CustomersServices.fncGetUserByEmail(req, res);
        return res.json(response);
    }


    async getOne(req, res) {
        const response = await CustomersServices.fncGetOne(req);
        return res.json(response);
    }

    async changeProfile(req, res) {
        const response = await CustomersServices.fncUpateCustomer(req);
        return res.json(response);
    }
}

module.exports = new CustomersController