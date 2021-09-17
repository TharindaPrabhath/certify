import AdminDto from "./AdminDto";
import UserDto from "./UserDto";

interface CertificateDto{
    id: string,
    type: string,
    reason: string,
    remarks: string,
    issuedDate: string,
    user: UserDto,
    admin: AdminDto
}

export default CertificateDto;