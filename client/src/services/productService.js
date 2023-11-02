import axios from 'axios';


export const getAllProducts = async () => {
    return await axios.get(`http://localhost:5000/products`);
}

export const getAllProductsLimit = async (filter) => {
    return await axios.post(`http://localhost:5000/products/limit`, filter);
}

export const getAllProductsAdmin = async (filter) => {
    return await axios.post(`http://localhost:5000/products/admin`, filter, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`,
        }
    });
}

export const createProduct = async (data) => {
    return await axios.post('http://localhost:5000/products/create', data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getDetailProduct = async (slug) => {
    return await axios.get(`http://localhost:5000/products/detail/${slug}`);
}

export const getByCategoryId = async (id) => {
    return await axios.get(`http://localhost:5000/products/category/${id}`);
}


export const updateProduct = async (slug, data) => {
    return await axios.put(`http://localhost:5000/products/update/${slug}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

// export const deleteProduct = async (id) => {
//     return await axios.put(`http://localhost:5000/products/delete/${id}`, {
//         headers: {
//             'token': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }