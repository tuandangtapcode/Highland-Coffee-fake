import axios from 'axios';

export const addToOrder = (customerid, data) => {
    return axios.post(`http://localhost:5000/orders/pay/${customerid}`, data, {
        withCredentials: true,
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const gettAllOrdersWaiting = (page) => {
    return axios.get(`http://localhost:5000/orders/admin/waiting?page=${page}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const gettAllOrders = (page) => {
    return axios.get(`http://localhost:5000/orders/admin?page=${page}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const getOrderByCustomer = (customerid, page) => {
    return axios.get(`http://localhost:5000/orders/customer/${customerid}?page=${page}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const confirmOrder = (data) => {
    return axios.put(`http://localhost:5000/orders/confirm-order`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const cancelOrder = (userid, id, pid) => {
    return axios.get(`http://localhost:5000/orders/cancel-order/${userid}?id=${id}&product_id=${pid}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const confirmGetOrder = (id, data) => {
    return axios.put(`http://localhost:5000/orders/confirm-getorder/${id}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
