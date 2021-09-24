import AdminDto from "./AdminDto";

interface UserDto{
    id: number,
    fname: string,
    lname: string,
    email: string;
    phone: string,
    role: string,
    member: boolean,
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