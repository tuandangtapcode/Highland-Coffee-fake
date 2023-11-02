

class UtilService {

    async formatSlug(string) {
        const nomalize = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const slug = nomalize.replace(/\s+/g, "-");
        return slug;
    }

    async randomNumber() {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    };

    async border () {
        const format = await formatSlug();
        const random = await randomNumber();
    }

}

module.exports = new UtilService;
