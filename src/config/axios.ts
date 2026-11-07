import axios from "axios";
import Cookies from 'js-cookie';




const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrf_token');

    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});




export default api;
