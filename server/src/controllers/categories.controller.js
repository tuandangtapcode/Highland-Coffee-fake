const CategoriesServices = require('../services/categories.services')


class CategoriesController {

    async getAllCategories(req, res) {
        const response = await CategoriesServices.fncGetAllCategories(req);
        return res.json(response);
    }

    async getAllCategoriesNotPaginate(req, res) {
        const response = await CategoriesServices.fncGetAllCategoriesNotPaginate();
        return res.json(response);

    }

    async createCategory(req, res) {
        const response = await CategoriesServices.fncCreateCategory(req);
        return res.json(response);
    }

    async getOneCategory(req, res) {
        const response = await CategoriesServices.fncGetOneCategory(req);
        return res.json(response);
    }

    async updateCatgory(req, res) {
        const response = await CategoriesServices.fncUpdateCategory(req);
        return res.json(response);
    }

}

module.exports = new CategoriesController;