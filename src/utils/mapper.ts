import AdminDto from "../types/models/AdminDto";
import CertificateDto from "../types/models/CertificateDto";
import UserDto from "../types/models/UserDto";

export const getAdminDto = (data: any):AdminDto => {
    return {id: data.id, username: data.username, email: data.email}
}

export const getUserDto = (data: any):UserDto => {
    return {uid: data.uid, fName: data.fname, lName: data.lname, email: data.email, 
            phone: data.phone, role: data.role, address: data.address, 
            description: data.description, emailVerified: data.emailVerified, 
            certified: data.certified, numCertificates: data.numCertificates, admin: data.admin, 
            birthday: data.birthday, createdDate: data.createdDate}
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
            issuedDate: data.issuedDate, user: getUserDto(data.user), issuedAdmin: getAdminDto(data.issuedAdmin)}
}

export const toCertificateDtos = (arr: any[]):CertificateDto[] => {
    var certificates: CertificateDto[] = [];

    arr.map((item) => {
        certificates.push(getCertificateDto(item));
        return certificates;
    })

    return certificates;
}