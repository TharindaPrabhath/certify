interface CustomFormProp{
    values: CreateNewUserFormProp;
    errors: CreateNewUserFormProp;
    handleChange: (event: any) => void;
}

export default CustomFormProp;

export interface CreateNewUserFormProp{
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    phone: number;
    role: string;
    birthday: string;
    address: string;
    description: string;
}
