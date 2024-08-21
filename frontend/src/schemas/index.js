import * as Yup from "yup";
import { gender as genderItems } from "../data/selectionData";

const usernameRegex = /^[A-Za-z0-9_-]*$/;
const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const url = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

export const name = Yup.string().required('Please enter your name').min(3, 'Name must contains atleast 3 letters').max(50, 'Name is too long')
export const gender = Yup.string().required('Please select your gender').oneOf(genderItems, 'Gender must be either men or women')
export const date_of_birth = Yup.date()
export const time_of_birth = Yup.date()
export const place_of_birth = Yup.string()
export const disability = Yup.string()
export const education = Yup.string().required('Please write about your education').max(50, 'Write within 50 letters')
export const occupation = Yup.string().required('Please write about your occupation').max(50, 'Write within 50 letters')
export const income = Yup.number().required('Please enter your income')
export const location = Yup.string().required('Please enter your location').max(120, 'Only write the city/town name')
export const height = Yup.number().required('Please enter your height').min(24, 'Height is too short').max(90, 'Height is too long')
export const manglik = Yup.string().max(25, 'Too long string')
export const father_name = Yup.string().max(50, 'Write within 50 letters')
export const father_occupation = Yup.string().max(50, 'Write within 50 letters')
export const mother_name = Yup.string().max(50, 'Write within 50 letters')
export const mother_occupation = Yup.string().max(50, 'Write within 50 letters')
export const email = Yup.string().email().required("Please enter your email").max(50, 'Email is too long')
export const password = Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character").max(18, 'Password is too long')
export const phone_number = Yup.string().required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid')
export const alternate_phone_number = Yup.string().matches(phoneRegExp, 'Phone number is not valid')
export const about_me = Yup.string().max(500, 'Please write it within 500 letters')
export const profile_managed_by = Yup.string().max(50, 'Please write it within 50 letters')
export const weight_category = Yup.string().max(50, 'Write it within 50 letters')
export const complexion = Yup.string().max(20, 'Write it within 50 letters')
export const martial_status = Yup.string().max(50, 'Write it within 50 letters')
export const diet = Yup.string().max(50, 'Write it within 50 letters')
export const disease = Yup.string().max(50, 'Write it within 50 letters')
export const kundli_milan = Yup.string().max(10, 'Write it within 10 letters')
export const gotra_self = Yup.string().max(20, 'Write it within 20 letters')
export const gotra_nanihal = Yup.string().max(20, 'Write it within 20 letters')
export const address = Yup.string().max(70, 'Address is too long')
export const web_link = Yup.string()
