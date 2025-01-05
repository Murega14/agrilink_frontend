import axios from "axios";

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: 'https://agrilink-1-870p.onrender.com',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `application/json`,
    },
    withCredentials: true
});

export default axiosInstance;