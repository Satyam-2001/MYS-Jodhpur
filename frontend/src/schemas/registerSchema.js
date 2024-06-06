import * as Yup from "yup";
import { gender } from "../data/selectionData";

const usernameRegex = /^[A-Za-z0-9_-]*$/;
const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const registerSchema = [
    Yup.object({
        name: Yup.string().required('Please enter your name'),
        gender: Yup.string().required('Please select your gender').oneOf(gender, 'Gender must be either men or women'),
        date_of_birth: Yup.date().required('Please enter your date of birth'),
        time_of_birth: Yup.date().required('Please enter your time of birth'),
        place_of_birth: Yup.string().required('Please enter your place of birth'),
        disability: Yup.string(),
    }),
    Yup.object({
        education: Yup.string().required('Please write about your education'),
        occupation: Yup.string().required('Please write about your occupation'),
        income: Yup.number().required('Please enter your income'),
        location: Yup.string().required('Please enter your location'),
        height: Yup.string().required('Please enter your height'),
        manglik: Yup.string().required('Please enter your manglik status'),
    }),
    Yup.object({
        father_name: Yup.string(),
        father_occupation: Yup.string(),
        mother_name: Yup.string(),
        mother_occupation: Yup.string(),
    }),
    Yup.object({
        email: Yup.string().email().required("Please enter your email"),
        password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
        phone_number: Yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
    })
]

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
})