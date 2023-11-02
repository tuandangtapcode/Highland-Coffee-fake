const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');
const { authAdminMidleware, authUsernMidleware } = require('../middlewares/auth.midlewares');

router.post('/pay/:id', authUsernMidleware, OrdersController.addToOrder);
router.get('/admin/waiting', authAdminMidleware, OrdersController.gettAllOrdersWaiting)
router.get('/admin', authAdminMidleware, OrdersController.gettAllOrders)
router.get('/customer/:id', authUsernMidleware, OrdersController.getOrderByCustomer);
router.put('/confirm-getorder/:id', authUsernMidleware, OrdersController.confirmGetOrder);
router.put('/confirm-order', authAdminMidleware, OrdersController.confirmOrder);
router.get('/cancel-order/:id', authUsernMidleware, OrdersController.cancelOrder);



module.exports = router;