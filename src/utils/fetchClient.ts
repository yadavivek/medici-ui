import axios from "axios";

// Create an instance of Axios
const fetchClient = axios.create({
    baseURL: "http://34.135.166.70", // Replace with your API base URL
    timeout: 10000, // Timeout in milliseconds
});

// Add a request interceptor to include JWT token in headers
fetchClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
fetchClient.interceptors.response.use(
    (response) => {
        return response; // Simplify responses by returning only the data
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            sessionStorage.removeItem("authToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default fetchClient;
