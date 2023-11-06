import axios from 'axios';


export const getAllProducts = () => {
    return axios.get(`http://localhost:5000/products`);
}

export const getAllProductsLimit = (filter) => {
    return axios.post(`http://localhost:5000/products/limit`, filter);
}

export const getAllProductsAdmin = (filter) => {
    return axios.post(`http://localhost:5000/products/admin`, filter, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`,
        }
    });
}

export const createProduct = (data) => {
    return axios.post('http://localhost:5000/products/create', data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getDetailProduct = (slug) => {
    return axios.get(`http://localhost:5000/products/detail/${slug}`);
}

export const getByCategoryId = (id) => {
    return axios.get(`http://localhost:5000/products/category/${id}`);
}


export const updateProduct = (slug, data) => {
    return axios.put(`http://localhost:5000/products/update/${slug}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

// export const deleteProduct =  (id) => {
//     return  axios.put(`http://localhost:5000/products/delete/${id}`, {
//         headers: {
//             'token': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }