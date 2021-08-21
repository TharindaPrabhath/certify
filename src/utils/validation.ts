import { useState } from "react"
import CustomFormProp, { CreateNewUserFormProp } from "../types/FormProp";

export const useCreateNewUserForm = (): CustomFormProp => {

    const [values, setValues] = useState<CreateNewUserFormProp>({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        role: "",
        birthday: "",
        address: "",
        description: "",
        emailVerified: false
    });
    const [errors, setErrors] = useState<CreateNewUserFormProp>({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        role: "",
        birthday: "",
        address: "",
        description: "",
        emailVerified: false
    });

    const handleChange = (event: any) => {
        const {name, value} = event.target;

        setValues(
            {...values, [name]: value}
        );

        if(!values.firstName) errors.firstName = "First name is required"
        else errors.firstName = ""
        setErrors(errors)
        // else errors.firstName = ""
        //setErrors({...errors, [errors.firstName]: "First name is required"})
    }

    return {values, errors, handleChange};
}