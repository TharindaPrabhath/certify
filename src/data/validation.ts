import * as yup from "yup";

const userValidationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    phone: yup.number(),
    role: yup.string(),
    address: yup.string(),
    description: yup.string(),
    emailVerified: yup.boolean(),
    birthday: yup.date(),
});

const certificateValidationSchema = yup.object().shape({
    reciever: yup.string().required(),
    type: yup.string().required(),
    customEmail: yup.string().email("Invalid Email"),
    defaultEmail: yup.boolean(),
    remarks: yup.string(),
});

const validationConditions:any = [
    userValidationSchema, certificateValidationSchema
]

export default validationConditions;