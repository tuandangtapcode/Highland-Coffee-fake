const formatSlug = require('../utils/format-slug');
const randomNumber = require('../utils/random-code');


module.exports = async () => {
    const format = await formatSlug();
    const random = await formatSlug();
}