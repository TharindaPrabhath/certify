import AdminDto from "./AdminDto";
import UserDto from "./UserDto";

interface CertificateDto{
    id: number,
    type: string,
    reason: string,
    remarks: string,
    issuedDate: string,
    user: UserDto,
    issuedAdmin: AdminDto
}

export default CertificateDto;