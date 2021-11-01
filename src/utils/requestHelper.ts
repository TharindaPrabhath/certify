import axios from "axios";
import requests from "../data/requests";
import CertificateDto from "../types/models/CertificateDto";
import UserDto from "../types/models/UserDto";
import axiosInstance, { API_BASE_URL } from "./axios";

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  adminId: number
) {
  return await axiosInstance().put(requests.changePassword, {
    newPassword: newPassword,
    currentPassword: currentPassword,
    adminId: adminId,
  });
}

export function validateToken() {
  return axiosInstance().get(requests.validateToken);
}

export function fetchAdminByUsername(username: string) {
  return axiosInstance().get(requests.fetchAdminByUsername, {
    params: {
      username: username,
    },
  });
}

export function fetchUser(id: number) {
  return axiosInstance().get(requests.fetchUser, {
    params: {
      id: id,
    },
  });
}

export function fetchUsers() {
  return axiosInstance().get(requests.fetchUsers);
}

export function fetchSuggestionUsers(query: string) {
  return axiosInstance().get(requests.fetchSuggestionUsers, {
    params: {
      query: query,
    },
  });
}

export async function addUser(user: any) {
  return await axiosInstance().post(requests.postNewUser, user);
}

export async function updateUser(
  id: number,
  updatedUser: UserDto,
  adminId: number
) {
  return await axiosInstance().put(requests.updateUser, updatedUser, {
    params: {
      user_id: id,
      admin_id: adminId,
    },
  });
}

export function deleteUser(id: number, adminId: number) {
  return axiosInstance().delete(requests.deleteUser, {
    params: {
      user_id: id,
      admin_id: adminId,
    },
  });
}

export async function validateCertificate(id: string) {
  return await axios.get(API_BASE_URL + requests.validateCertificate, {
    params: {
      id: id,
    },
  });
}

export function fetchCertificate(id: string) {
  return axios.get(API_BASE_URL + requests.fetchCertificate, {
    params: {
      id: id,
    },
  });
}

export function fetchCertificates() {
  return axiosInstance().get(requests.fetchCertificates);
}

export function fetchCertificatesByUser(uid: number) {
  return axiosInstance().get(requests.fetchCertificatesByUser, {
    params: {
      id: uid,
    },
  });
}

export async function fetchEvents() {
  return await axiosInstance().get(requests.fetchEvents);
}

export async function fetchReports() {
  return await axiosInstance().get(requests.fetchReports);
}

export async function addCertificate(certificate: any) {
  return await axiosInstance().post(requests.postNewCertificate, certificate);
}

export async function addThirdPartyCertificate(certificate: any) {
  return await axiosInstance().post(
    requests.postNewThirdPartyCertificate,
    certificate
  );
}

export async function addCertificateBulk(certificateBulk: any) {
  return await axiosInstance().post(
    requests.postCertificateBulk,
    certificateBulk
  );
}

export async function updateCertificate(
  id: string,
  updatedCertificate: CertificateDto,
  adminId: number
) {
  return await axiosInstance().put(
    requests.updateCertificate,
    updatedCertificate,
    {
      params: {
        certificate_id: id,
        admin_id: adminId,
      },
    }
  );
}

export async function deleteCertificate(id: string, adminId: number) {
  return await axiosInstance().delete(requests.deleteCertificate, {
    params: {
      certificate_id: id,
      admin_id: adminId,
    },
  });
}

export async function fetchAdminsAnalytics() {
  return await axiosInstance().get(requests.fetchAdminsAnalytics);
}

export async function fetchUsersAnalytics() {
  return await axiosInstance().get(requests.fetchUsersAnalytics);
}

export async function fetchCertificatesAnalytics() {
  return await axiosInstance().get(requests.fetchCertificatesAnalytics);
}

export async function fetchActivities(adminId: number) {
  return await axiosInstance().get(requests.fetchActivities, {
    params: {
      admin_id: adminId,
    },
  });
}
