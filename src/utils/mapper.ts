import moment from "moment";
import AdminDto from "../types/models/AdminDto";
import CertificateDto from "../types/models/CertificateDto";
import UserDto from "../types/models/UserDto";

export const getAdminDto = (data: any):AdminDto => {
    return {id: data.id, username: data.name, email: data.email}
}

export const getUserDto = (data: any):UserDto => {
    return {id: data.uid, fname: data.fname, lname: data.lname, email: data.email, 
            phone: data.phone, role: data.role, address: data.address, 
            description: data.description, emailVerified: data.emailVerified, 
            certified: data.certified, numCertificates: data.numCertificates, admin: data.admin, 
            birthday: data.birthday, createdDate: data.createdDate, member: data.member}
}

export const toUserDtos = (arr: any[]):UserDto[] => {
    var users: UserDto[] = [];

    arr.map((item) => {
        users.push(getUserDto(item));
        return users;
    })

    return users;

}

export const getCertificateDto = (data: any):CertificateDto => {
    return {id: data.id, type: data.type, reason: data.reason, remarks: data.remarks, 
            issuedDate: moment(data.issuedDate, "YYYY-MM-DD").format("YYYY-MM-DD"), user: getUserDto(data.user), 
            admin: getAdminDto(data.admin), memberCertificate: data.memberCertificate}
}

export const toCertificateDtos = (arr: any[]):CertificateDto[] => {
    var certificates: CertificateDto[] = [];

    arr.map((item) => {
        certificates.push(getCertificateDto(item));
        return certificates;
    })

    return certificates;
}