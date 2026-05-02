import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Update this if your backend port changes
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
