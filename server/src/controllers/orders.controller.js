const OrdersServices = require('../services/orders.services');

class OrdersController {

    async addToOrder(req, res) {
        const response = await OrdersServices.fncAddToOrder(req);
        res.json(response);
    }

    async gettAllOrdersWaiting(req, res) {
        const response = await OrdersServices.fncGetAllOrdersWaiting(req);
        return res.json(response);
    }

    async gettAllOrders(req, res) {
        const response = await OrdersServices.fncGetAllOrder(req);
        return res.json(response);
    }

    async getOrderByCustomer(req, res) {
        const response = await OrdersServices.fncGetOrdersByCustomer(req);
        return res.json(response);
    }

    async confirmOrder(req, res) {
        const response = await OrdersServices.fncConfirmOrder(req);
        return res.json(response);
    }

    async cancelOrder(req, res) {
        const response = await OrdersServices.fncCancelOrder(req);
        return res.json(response);
    }

    async confirmGetOrder(req, res) {
        const response = await OrdersServices.fncConfirmGetOrder(req);
        return res.json(response);
    }

}

module.exports = new OrdersController