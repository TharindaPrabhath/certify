import axios from "axios";
import requests from "../data/requests";
import { API_BASE_URL } from "./axios";

export const isAdminLoggedIn = (): boolean => {
    const token = localStorage.getItem("token");
    if(token === null) return false;
    if(token.startsWith("Bearer ")) return true;
    return false;
} 

export const signin = (values: any) => {

    const res = axios.post(API_BASE_URL+requests.login, values);
    res.then((res)=>{
       
    })
}