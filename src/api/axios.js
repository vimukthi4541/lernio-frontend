import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Update this if your backend port changes
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default api;
