import axios from "axios";

const axiosBase = axios.create({
    baseURL:"https://staging-api.treyos.com/api/",
    headers: {
        'Authorization':`Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
});

export default axiosBase;