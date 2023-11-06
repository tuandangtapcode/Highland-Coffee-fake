import axios from "axios";

export const getAllComment = (pid) => {
    return axios.get(`http://localhost:5000/comments/get-all/${pid}`);
}

export const sendComment = (data) => {
    return axios.post(`http://localhost:5000/comments/send`, data);
}


export const editComment = (data) => {
    return axios.put(`http://localhost:5000/comments/edit`, data);
}
