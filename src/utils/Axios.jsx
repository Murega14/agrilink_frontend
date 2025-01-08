import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://agrilink-1-870p.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                    return Promise.reject(error);
                }

                const response = await axios.post(`${axiosInstance.defaults.baseURL}/refresh_token`, { refreshToken }, { withCredentials:true });

                const newToken = response.data.token;

                localStorage.setItem('token', newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;