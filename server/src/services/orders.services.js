const { Orders, Products, Customers } = require('../models');
const { Op } = require("sequelize");
const responseResult = require('../utils/response-result');

class OrdersServices {

    async fncAddToOrder(req) {
        const customer_id = req.params.id;
        const { phone, city, district, wards, address, created_date } = req.body
        const carts = req.cookies.cart || [];
        const createOrderPromises = carts.map(async cart => {
            return Orders.create({
                customer_id,
                product_id: cart.product_id,
                quantity: cart.quantity,
                price: cart.price,
                created_date,
                address,
                phone,
                city,
                district,
                wards
            });
        });
        return await Promise.all(createOrderPromises);
    }

    async fncGetAllOrdersWaiting(req) {
        const page = req.query.page;
        try {
            const data = await Orders.findAndCountAll({
                where: {
                    status: {
                        [Op.substring]: 'Chờ xác nhận'
                    }
                },
                include: [
                    {
                        model: Products,
                        attributes: ['id', 'name', 'image'],
                    },
                    {
                        model: Customers,
                        attributes: ['fullname'],
                    }
                ],
                limit: parseInt(process.env.LIMIT_ORDER),
                offset: page * parseInt(process.env.LIMIT_ORDER)
            });
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetAllOrder(req) {
        const page = req.query.page;
        try {
            const data = await Orders.findAndCountAll({
                where: {
                    status: {
                        [Op.notLike]: 'Chờ xác nhận'
                    }
                },
                include: [
                    {
                        model: Products,
                        attributes: ['name', 'image'],
                    },
                    {
                        model: Customers,
                        attributes: ['fullname'],
                    }
                ],
                limit: parseInt(process.env.LIMIT_ORDER),
                offset: page * parseInt(process.env.LIMIT_ORDER)
            });
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetOrdersByCustomer(req) {
        const id = req.params.id;
        const { page } = req.query
        try {
            const data = await Orders.findAndCountAll({
                where: {
                    customer_id: id
                },
                include:
                {
                    model: Products,
                    attributes: ['id', 'name', 'image'],
                },
                limit: parseInt(process.env.LIMIT_ORDER),
                offset: page * parseInt(process.env.LIMIT_ORDER)
            })
            if (!data) return responseResult({}, true, 'Người dùng không tồn tại');
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncConfirmOrder(req) {
        const { id, product_id, confirmed_date } = req.body;
        try {
            const product = await Products.findOne({
                where: {
                    id: product_id
                }
            })
            const order = await Orders.findOne({
                where: {
                    id: id
                }
            })
            if (product.quantity > order.quantity) {
                await Products.update({
                    quantity: Products.sequelize.literal(`quantity - ${order.quantity}`)
                }, {
                    where: {
                        id: product_id
                    }
                })
                return await Orders.update({
                    status: 'Chờ lấy hàng',
                    confirmed_date: confirmed_date
                }, {
                    where: {
                        id: id
                    }
                })
            } else {
                return await Orders.update({
                    status: 'Số lượng sản phẩm không đủ để đáp ứng yêu cầu của quý khách',
                }, {
                    where: {
                        id: id
                    }
                })
            }
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncCancelOrder(req) {
        const { id, product_id } = req.query;
        try {
            const order = await Orders.findOne({
                where: {
                    id: id
                }
            })
            await Products.update({
                quantity: Products.sequelize.literal(`quantity + ${order.quantity}`)
            }, {
                where: {
                    id: product_id
                }
            })
            return await Orders.update({
                status: 'Hủy đơn hàng',
            }, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncConfirmGetOrder(req) {
        const { id, getted_date } = req.body;
        try {
            return await Orders.update({
                status: 'Đã nhận được hàng',
                getted_date: getted_date
            }, {
                where: {
                    id
                }
            })
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

}

module.exports = new OrdersServices;