const ProductsServices = require('../services/products.services')

class ProductsController {

    async getAllProducts(req, res) {
        const response = await ProductsServices.fncGetAllProducts();
        return res.json(response);
    }

    async getAllProductsLimit(req, res) {
        const response = await ProductsServices.fncGetAllProductsLimit(req);
        return res.json(response);
    }

    async getAllProductsAdmin(req, res) {
        const response = await ProductsServices.fncGetAllProductsAdmin(req);
        return res.json(response);

    }

    async getOneProduct(req, res) {
        const response = await ProductsServices.fncGetOneProduct(req);
        return res.json(response);
    }

    async getByCategoryId(req, res) {
        const response = await ProductsServices.fncGetByCategoryId(req);
        return res.json(response);
    }

    async createProduct(req, res) {
        const response = await ProductsServices.fncCreateProduct(req);
        return res.json(response);
    }

    // Update product
    async updateProduct(req, res) {
        const response = await ProductsServices.fncUpdateProduct(req);
        return res.json(response);
    }

    //Delete product (soft delete)
    async deleteProduct(req, res) {
        const response = await ProductsServices.fncDeleteProduct(req);
        return res.json(response);
    }

}

module.exports = new ProductsController;