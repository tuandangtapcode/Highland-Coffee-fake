import axios from 'axios';


export const login = (data) => {
    return axios.post(`http://localhost:5000/customers/login`, data);
}

export const update = (id) => {
    return axios.put(`http://localhost:5000/customers/update/${id}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const getAllCustomer = (data) => {
    return axios.post(`http://localhost:5000/customers`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const register = (data) => {
    return axios.post(`http://localhost:5000/customers/register`, data, {
        withCredentials: true
    });
}

export const getProfileCustomer = (id) => {
    return axios.get(`http://localhost:5000/customers/${id}`);
}


export const getUserByEmail = (email) => {
    return axios.get(`http://localhost:5000/customers/get-by-email?email=${email}`, {
        withCredentials: true
    });
}

export const changePassword = (id, data) => {
    return axios.put(`http://localhost:5000/customers/change-password/${id}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const forgotPassword = (id, data) => {
    return axios.put(`http://localhost:5000/customers/forgot-password/${id}`, data, {
        withCredentials: true,
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}