import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api/v1";
export const TOKEN = localStorage.getItem("token");

const axiosInstance = axios.create(
    {
        headers: {
            Authorization: TOKEN, 
        },

        baseURL: API_BASE_URL
        
    }
);



export default axiosInstance;