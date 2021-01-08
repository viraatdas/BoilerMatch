import axios from 'axios';

// Create axios client, pre-configured with baseURL
let api = axios.create({
    baseURL: 'https://localhost:8000',
});

export default api;
