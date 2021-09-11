import requests from "../data/requests";
import CertificateDto from "../types/models/CertificateDto";
import UserDto from "../types/models/UserDto";
import axiosInstance from "./axios";

export function validateToken(){
    return axiosInstance.get(requests.validateToken);
}

export async function fetchAdminByUsername(username: string) {
    return await axiosInstance.get(`${requests.fetchAdminByUsername}/${username}`);
}


export async function fetchUsers(){
    return await axiosInstance.get(requests.fetchUsers);
}

export async function addUser(user: any){
    return await axiosInstance.post(requests.postNewUser, user);
}

export async function updateUser(uid: number, updatedUser: UserDto){
    return await axiosInstance.put(`${requests.updateUser}/${uid}`, updatedUser);
} 

export async function deleteUser(uid: number){
    return await axiosInstance.delete(`${requests.deleteUser}/${uid}`)
}



export async function fetchCertificates(){
    return await axiosInstance.get(requests.fetchCertificates);
}

export async function addCertificate(certificate: any){
    return await axiosInstance.post(requests.postNewCertificate, certificate);
}

export async function updateCertificate(id: number, updatedCertificate: CertificateDto){
    return await axiosInstance.put(`${requests.updateCertificate}/${id}`, updatedCertificate);
} 

export async function deleteCertificate(id: number){
    return await axiosInstance.delete(`${requests.deleteCertificate}/${id}`)
}


export async function fetchUsersAnalytics(){
    return await axiosInstance.get(requests.fetchUsersAnalytics);
}

export async function fetchCertificatesAnalytics(){
    return await axiosInstance.get(requests.fetchCertificatesAnalytics);
}