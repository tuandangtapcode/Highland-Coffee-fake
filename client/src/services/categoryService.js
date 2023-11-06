import axios from 'axios';


export const getAllCategories = (data) => {
    return axios.post(`http://localhost:5000/categories`, data);
}

export const getAllCategoriesNotPageinate = () => {
    return axios.get(`http://localhost:5000/categories/not-paginate`);
}


export const getOneCategory = (slug) => {
    return axios.get(`http://localhost:5000/categories/detail/${slug}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const updateCategory = (slug, data) => {
    return axios.put(`http://localhost:5000/categories/update/${slug}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const createCategory = (data) => {
    return axios.post('http://localhost:5000/categories/create', data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}