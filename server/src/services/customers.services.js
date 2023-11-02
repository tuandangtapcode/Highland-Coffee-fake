const { Customers } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sendMail = require('../utils/send-mail');
const randomCode = require('../utils/random-code');
const responseResult = require('../utils/response-result');
const { accessToken } = require('./jwt.services');
const { Op } = require("sequelize");

class CustomersServices {

    async fncGetAllCustomers(req) {
        const { page, keyword } = req.body;
        try {
            const data = await Customers.findAndCountAll({
                where: {
                    is_admin: false,
                    fullname: {
                        [Op.substring]: keyword
                    }
                },
                limit: parseInt(process.env.LIMIT_CUSTOMER),
                offset: page * parseInt(process.env.LIMIT_CUSTOMER)
            })
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncLogin(req) {
        const { email, password } = req.body;
        try {
            const getCustomer = await Customers.findOne({
                where: {
                    email
                }
            })
            if (!getCustomer) return responseResult({}, true, 'Email không chính xác');
            const check = bcrypt.compareSync(password, getCustomer.password);
            if (!check) return responseResult({}, true, 'Mật khẩu không chính xác');
            const access_token = accessToken({
                id: getCustomer.id,
                is_admin: getCustomer.is_admin,
            })
            return responseResult(access_token, false, 'Login thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }


    async fncRegister(req, res) {
        const { email } = req.body;
        let code = 0;
        try {

            const checkEmailExists = await Customers.findOne({
                where: {
                    email
                }
            })
            if (checkEmailExists) return responseResult({}, true, 'Email đã tồn tại');
            const codeCheck = req.body.code;
            const codeCheckRandom = req.cookies.ccrd;
            if (!codeCheck) {
                code = randomCode();
                res.cookie('ccrd', bcrypt.hashSync(code.toString(), saltRounds), { maxAge: 36000000 });
                const subject = "Thông tin đăng ký tài khoản tại Highland Coffee";
                const content = `
                    <html>
                    <head>  
                    <style>
                        p {
                            color: #333;
                        }
                        span {
                            font-weight: 600;
                        }
                    </style>
                    </head>
                    <body>
                        <h3>Chào mừng đến với Highlands Coffee CPG</h3>
                        <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>
                        <p>Hãy nhập mã xác thực sau để hoàn tất quá trình đăng ký: <span>${code}</span></p>
                    </body>
                    </html>`
                await sendMail(email, subject, content);
                return responseResult({}, false, 'Mã xác nhận đã được gửi về mail của bạn');
            } else {
                if (!bcrypt.compareSync(codeCheck, codeCheckRandom)) responseResult({}, true, 'Mã xác nhận không chính xác');
                res.clearCookie('ccrd');
                const password = req.body.password
                const hashPassword = bcrypt.hashSync(password, saltRounds);
                const hashCustomer = { ...req.body, password: hashPassword };
                const newCustomer = await Customers.create(hashCustomer);
                const subject = "Thông tin đăng ký tài khoản tại Highland Coffee";
                const content = `
                        <html>
                        <head>  
                            <style>
                                p {
                                    color: #333;
                                }
                            </style>
                        </head>
                        <body>
                            <h3>Chào mừng đến với Highlands Coffee CPG</h3>
                            <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>
                        <p>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ <a href='http://localhost:3000'>http://localhost:3000</a> để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>
                            </body>
                        </html>`
                await sendMail(email, subject, content);
                return responseResult(newCustomer, false, 'Đăng ký thành công');
            }
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    // Change profile
    async fncUpateCustomer(req) {
        const id = req.params.id;
        try {
            const getCustomer = await Customers.findOne({
                where: {
                    id
                }
            });
            if (!getCustomer) return responseResult({}, true, 'Người dùng không tồn tại');
            const newCustomer = await Customers.update(req.body, {
                where: {
                    id
                }
            })
            return responseResult(newCustomer, false, 'Cập nhật profile thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncForgotPassword(req) {
        const id = req.params.id;
        const password = req.body.password
        try {
            const checkEmailExists = await Customers.findOne({
                where: {
                    id
                }
            })
            if (!checkEmailExists) return responseResult({}, true, 'Tài khoản không tồn tại');
            const hashPassword = bcrypt.hashSync(password, saltRounds);
            const newCustomer = await Customers.update({
                password: hashPassword
            }, {
                where: {
                    id: checkEmailExists.id
                }
            });
            return responseResult(newCustomer, false, 'Đổi mật khẩu thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncChangePassword(req) {
        const id = req.params.id;
        const { oldpassword, newpassword } = req.body;
        try {
            const getCustomer = await Customers.findOne({
                where: {
                    id
                }
            })
            if (!getCustomer) return responseResult({}, true, 'Người dùng không tồn tại');
            const check = bcrypt.compareSync(oldpassword, getCustomer.password);
            if (!check) return responseResult({}, true, 'Mật khẩu không chính xác');
            const hashPassword = bcrypt.hashSync(newpassword, saltRounds);
            const newCustomer = await Customers.update({
                password: hashPassword
            }, {
                where: {
                    id: getCustomer.id
                }
            });
            return responseResult(newCustomer, false, 'Đổi mật khẩu thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetUserByEmail(req, res) {
        const email = req.query.emaill;
        try {
            const checkEmailExists = await Customers.findOne({
                where: {
                    email
                }
            })
            if (!checkEmailExists) return responseResult({}, true, 'Email không chính xác');
            res.cookie('usid', `${checkEmailExists.id}${randomCode()}`, { maxAge: 36000000 });
            const subject = "Thiết lập lại mật khẩu tài khoản khách hàng";
            const content = `
                <html>
                <head>
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                  <p>Xin chào ${checkEmailExists.fullname}</p>
                  <p>Anh/chị đã yêu cầu đổi mật khẩu tại Highlands Coffee CPG.</p>
                  <p> Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé..</p>
                  <a href='http://localhost:3000/dat-lai-mat-khau'>Đặt lại mật khẩu</a>
                </body>
                </html>
                `
            await sendMail(email, subject, content);
            return responseResult(checkEmailExists, false, 'Mã xác nhận đã được gửi về mail của bạn');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }


    async fncGetOne(req) {
        const id = req.params.id;
        try {
            const customer = await Customers.findOne({
                where: {
                    id
                },
            })
            if (!customer) return responseResult({}, true, 'Người dùng không tồn tại')
            return responseResult(customer, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }


}

module.exports = new CustomersServices;