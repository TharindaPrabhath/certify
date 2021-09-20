import axios from "axios";
import requests from "../data/requests";
import { API_BASE_URL } from "./axios";
import useTokenService from "./useTokenService";

const useAuth = () => {
    const {getAccessToken} = useTokenService();

    const signin = async (values: any) => {
        return await axios.post(API_BASE_URL + requests.login, values);
    }

    const logout = async () => {

    }

    const isAdminLoggedIn = (): boolean => {
        const accessToken = getAccessToken();
        if(accessToken === null || accessToken === undefined) return false;
        return true;
    } 

    return {signin, logout, isAdminLoggedIn};

}

export default useAuth;