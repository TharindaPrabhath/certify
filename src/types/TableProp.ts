export interface TableHeadCellProp{
    id: string;
    name: string;
    numeric: boolean;
    label: string;
}

export interface UserTableProp{
    uid: string;
    name: string;
    email: string;
    role: string;
    birthday: string;    
}

export interface CertificateTableProp{
    certificateId: string;
    recievedBy: string;
    issuedBy: string;
    type: string; 
    issuedDate: string;
}

