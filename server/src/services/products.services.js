const { Products, Categories } = require('../models');
const { Op } = require("sequelize");
const formatSlug = require('../utils/format-slug');
const responseResult = require('../utils/response-result');


class ProductsServices {

    async fncGetAllProducts() {
        try {
            const data = await Products.findAll({
                where: {
                    is_deleted: false
                }
            })
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetAllProductsLimit(req) {
        const { page, cateSlug, keyword, sort, type } = req.body;
        try {
            let query;
            if (keyword) {
                query = {
                    where: {
                        is_deleted: false,
                        name: {
                            [Op.substring]: keyword
                        },
                    },
                    order: sort && [[sort, type]]
                }
            }
            if (cateSlug) {
                const category = await Categories.findOne({
                    where: {
                        slug: cateSlug
                    },
                })
                if (!category) return responseResult({}, true, 'Mặt hàng không tồn tại');
                query = {
                    where: {
                        is_deleted: false,
                        category_id: category.id,
                    },
                    order: sort && [[sort, type]]
                }
            }
            const data = await Products.findAndCountAll({
                ...query,
                include:
                {
                    model: Categories,
                    attributes: [['name', 'categoryName']],
                },
                limit: parseInt(process.env.LIMIT_PRODUCT),
                offset: page * parseInt(process.env.LIMIT_PRODUCT),
            })
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetAllProductsAdmin(req) {
        const { page, keyword } = req.body;
        try {
            const data = await Products.findAndCountAll({
                where: {
                    name: {
                        [Op.substring]: keyword
                    }
                },
                include:
                {
                    model: Categories,
                    attributes: [['name', 'categoryName']],
                },
                limit: parseInt(process.env.LIMIT_PRODUCT),
                offset: page * parseInt(process.env.LIMIT_PRODUCT),
            })

            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    // Detail
    async fncGetOneProduct(req) {
        const slug = req.params.slug;
        try {
            const product = await Products.findOne({
                where: {
                    slug
                }
            })
            if (!product) return responseResult({}, true, 'Sản phẩm không tồn tại');
            return responseResult(product, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetByCategoryId(req) {
        const category_id = req.params.cateid;
        try {
            const products = await Products.findAll({
                where: {
                    category_id,
                    is_deleted: false
                }
            })
            return responseResult(products, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }


    // Thêm product
    async fncCreateProduct(req) {
        const slug = formatSlug(req.body.name);
        try {
            const products = await Products.findOne({
                where: {
                    slug
                }
            });
            if (products) return responseResult({}, true, 'Sản phẩm đã tồn tại');
            const newProduct = await Products.create({ ...req.body, image: req.file.path, slug });
            return responseResult(newProduct, false, 'Thêm sản phẩm thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    // Update product
    async fncUpdateProduct(req) {
        const slug = req.params.slug;
        try {
            const product = await Products.findOne({
                where: {
                    slug
                }
            })
            if (!product) return responseResult({}, true, 'Sản phẩm không tồn tại');
            let newProduct = 0;
            if (req.file) {
                newProduct = await Products.update({ ...req.body, image: req.file.path }, {
                    where: {
                        slug
                    }
                });
            } else {
                newProduct = await Products.update({ ...req.body }, {
                    where: {
                        slug
                    }
                });
            }
            return responseResult(newProduct, false, 'Cập nhật sản phẩm thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    //Delete product (soft delete)
    async fncDeleteProduct(req) {
        const id = req.params.id;
        try {
            const newProduct = await Products.update({
                is_deleted: true
            }, {
                where: {
                    id
                }
            })
            return responseResult(newProduct, false, 'Xóa sản phẩm thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }
}

module.exports = new ProductsServices