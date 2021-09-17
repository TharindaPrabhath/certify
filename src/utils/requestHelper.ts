import axios from "axios";
import requests from "../data/requests";
import CertificateDto from "../types/models/CertificateDto";
import UserDto from "../types/models/UserDto";
import axiosInstance, { API_BASE_URL } from "./axios";

export function validateToken(){
    return axiosInstance().get(requests.validateToken);
}

export async function fetchAdminByUsername(username: string) {
    return await axiosInstance().get(requests.fetchAdminByUsername, {params: {
        username: username
    }});
}


export async function fetchUser(id: number){
    return await axiosInstance().get(requests.fetchUser, {params: {
        id: id
    }});
}

export async function fetchUsers(){
    return await axiosInstance().get(requests.fetchUsers);
}

export async function addUser(user: any){
    return await axiosInstance().post(requests.postNewUser, user);
}

export async function updateUser(id: number, updatedUser: UserDto){
    return await axiosInstance().put(requests.updateUser, updatedUser, {params: {
        id: id
    }});
} 

export function deleteUser(id: number){
    return axiosInstance().delete(requests.deleteUser, {params: {
        id: id
    }})
}


export async function validateCertificate(id: string) {
    return await axios.get(API_BASE_URL+requests.validateCertificate, {params: {
        id: id
    }})
}

export async function fetchCertificate(id: string){
    return await axiosInstance().get(requests.fetchCertificate, {params: {
        id: id
    }})
}

export async function fetchCertificates(){
    return await axiosInstance().get(requests.fetchCertificates);
}

export async function addCertificate(certificate: any){
    return await axiosInstance().post(requests.postNewCertificate, certificate);
}

export async function updateCertificate(id: string, updatedCertificate: CertificateDto){
    return await axiosInstance().put(requests.updateCertificate, updatedCertificate, {params: {
        id: id
    }});
} 

export async function deleteCertificate(id: string){
    return await axiosInstance().delete(requests.deleteCertificate, {params: {
        id: id
    }})
}


export async function fetchUsersAnalytics(){
    return await axiosInstance().get(requests.fetchUsersAnalytics);
}

export async function fetchCertificatesAnalytics(){
    return await axiosInstance().get(requests.fetchCertificatesAnalytics);
}