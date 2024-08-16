import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;
// Create an Axios instance
const API = axios.create({
    baseURL: api_url, // Set the base URL for all requests
    timeout: 10000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    }
});

export default API;