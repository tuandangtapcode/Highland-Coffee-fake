const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customer.controller');
const { authAdminMidleware, authUsernMidleware } = require('../middlewares/auth.midlewares');

router.get('/:id', CustomersController.getOne);
router.get('/get-by-email', CustomersController.getUserByEmail);
router.post('/login', CustomersController.login);
router.post('/', authAdminMidleware, CustomersController.getAllCustomers);
router.put('/change-password/:id', authUsernMidleware, CustomersController.changePassword);
router.put('/forgot-password/:id', authUsernMidleware, CustomersController.forgotPassword);
router.post('/register', CustomersController.register);
router.put('/update/:id', authUsernMidleware, CustomersController.changeProfile);


module.exports = router;