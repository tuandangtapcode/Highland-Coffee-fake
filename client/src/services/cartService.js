import Cookies from 'js-cookie';

export const addToCart = (data) => {
    const { product_id, quantity, price, image, name } = data;
    const carts = Cookies.get('cart') && JSON.parse(Cookies.get('cart').slice(2)) || [];
    let check = false;
    for (let i = 0; i < carts.length; i++) {
        if (carts[i].product_id === product_id) {
            carts[i] = { product_id, quantity: carts[i].quantity + quantity, price: carts[i].price + price, image: image, name: name };
            check = true;
            break;
        }
    }
    if (!check) {
        carts.push({ product_id, quantity, price, image, name });
    }
    Cookies.set('cart', `j:${JSON.stringify(carts)}`, { expires: 365 });
}

export const changeQuantity = (id, price, type) => {
    const carts = JSON.parse(Cookies.get('cart').slice(2));
    if (type === 'up') {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id == id) {
                carts[i].quantity = carts[i].quantity + 1;
                carts[i].price = carts[i].price + price;
            }
        }
    }
    if (type === 'down') {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].product_id == id) {
                carts[i].quantity = carts[i].quantity - 1;
                carts[i].price = carts[i].price - price;
            }
        }
    }
    Cookies.set('cart', `j:${JSON.stringify(carts)}`);
}

export const removeAllCart = () => {
    Cookies.remove('cart');
}

export const removeToCart = (id) => {
    const carts = Cookies.get('cart') && JSON.parse(Cookies.get('cart').slice(2)) || [];
    for (let i = 0; i < carts.length; i++) {
        if (carts[i].product_id == id) {
            carts.splice(i, 1);
        }
    }
    Cookies.set('cart', `j:${JSON.stringify(carts)}`);
}

export const getTotalInCart = () => {
    let carts = [];
    if (Cookies.get('cart') && Cookies.get('cart').startsWith('j')) carts = JSON.parse(Cookies.get('cart').slice(2));
    if (carts.length === 0) return 0;
    const total = carts.reduce((t, p) => {
        return t + p.quantity
    }, 0)
    return total;
}