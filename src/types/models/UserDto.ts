import AdminDto from "./AdminDto";

interface UserDto{
    uid: number,
    fName: string,
    lName: string,
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