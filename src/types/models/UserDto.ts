import AdminDto from "./AdminDto";

interface UserDto{
    uid: number,
    fname: string,
    lname: string,
    email: string;
    phone: string,
    role: string,
    birthday: string,
    createdDate: string,
    address: string,
    description: string,
    emailVerified: boolean,
    certified: boolean,
    numCertificates: number,
    admin: AdminDto
}

export default UserDto;