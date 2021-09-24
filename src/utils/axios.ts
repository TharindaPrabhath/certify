import axios from "axios";
import useTokenService from "./useTokenService";

// export const API_BASE_URL = "http://localhost:8080/api/v1";
export const API_BASE_URL = "https://symetry-certify.herokuapp.com/api/v1"
const useAxios = () => {
    const { getAccessToken } = useTokenService();
    const axiosInstance = axios.create(
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`, 
            },
    
            baseURL: API_BASE_URL
            
        }
    );

    // axiosInstance.interceptors.response.use(
    //     (res)=>
    //     new Promise((resolve, reject)=>{
    //         resolve(res);
    //     }),
    //     (err)=>{
    //         if(err.response.status === 403){
    //             window.location.pathname = "/signin";
    //         }
            
    //     }
    // )
    return axiosInstance;
    
}


export default useAxios;