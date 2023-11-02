const { Comments, Customers } = require('../models');

class CommentsServices {

    // create comment
    async fncSendComment(req) {
        const newComment = await Comments.create(req.body);
        return newComment;
    }

    // get all comment
    async fncGetAllComment(req) {
        const product_id = req.params.pid
        const comments = await Comments.findAll({
            where: {
                product_id
            },
            include: {
                model: Customers,
            }
        })
        return comments;
    }

    // edit comment
    async fncEditComment(req) {
        const { comment, id } = req.body;
        const newComment = await Comments.update({
            text: comment
        }, {
            where: {
                id
            }
        })
        return newComment;
    }

    // delete comment
    async fncDeleteComment(req) {
        const id = req.params.id;
        const deleteComment = await Comments.destroy({
            where: {
                id
            }
        })
        return deleteComment;
    }

}

module.exports = new CommentsServices;
