import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const instance = axios.create(
    {
        baseURL: API_BASE_URL
    }
);

export default instance;