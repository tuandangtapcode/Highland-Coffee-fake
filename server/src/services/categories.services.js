const { Categories } = require('../models');
const formatSlug = require('../utils/format-slug');
const responseResult = require('../utils/response-result');
const { Op } = require("sequelize");


class CategoriesServices {

    async fncGetAllCategories(req) {
        const { page, keyword } = req.body;
        try {
            const data = await Categories.findAndCountAll({
                where: {
                    name: {
                        [Op.substring]: keyword
                    }
                },
                limit: parseInt(process.env.LIMIT_CATEGORY),
                offset: page * parseInt(process.env.LIMIT_CATEGORY),
            });
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncGetAllCategoriesNotPaginate() {
        try {
            const data = await Categories.findAll();
            console.log(data);
            return responseResult(data, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncCreateCategory(req) {
        const slug = formatSlug(req.body.name);
        try {
            const category = await Categories.findOne({
                where: {
                    slug
                }
            });
            if (category) return responseResult({}, true, 'Mặt hàng đã tồn tại');
            const newCategory = await Categories.create({ ...req.body, slug });
            return responseResult(newCategory, false, 'Tạo mới mặt hàng thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }


    async fncGetOneCategory(req) {
        const slug = req.params.slug;
        try {
            const category = await Categories.findOne({
                where: {
                    slug
                }
            })
            if (!category) return responseResult({}, true, 'Mặt hàng không tồn tại');
            return responseResult(category, false, 'Lấy data thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

    async fncUpdateCategory(req) {
        const slug = req.params.slug;
        const name = req.body.name
        try {
            const getCategory = await Categories.findOne({
                where: {
                    slug
                }
            })
            if (!getCategory) return responseResult({}, true, 'Mặt hàng không tồn tại');
            const newCategory = await Categories.update({
                name,
                slug: formatSlug(name)
            }, {
                where: {
                    slug: slug
                }
            });
            return responseResult(newCategory, false, 'Chỉnh sửa mặt hàng thành công');
        } catch (error) {
            return responseResult({}, true, error.toString());
        }
    }

}

module.exports = new CategoriesServices;