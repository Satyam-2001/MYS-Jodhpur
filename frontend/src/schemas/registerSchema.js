import * as Yup from "yup";
import { date_of_birth, disability, education, email, father_name, father_occupation, gender, height, income, location, manglik, mother_name, mother_occupation, name, occupation, password, phone_number, place_of_birth, time_of_birth } from ".";

export const registerSchema = [
    Yup.object({
        name,
        gender,
        date_of_birth,
        height,
    }),
    Yup.object({
        education,
        occupation,
        income,
        location,
    }),
    // Yup.object({
    //     father_name,
    //     father_occupation,
    //     mother_name,
    //     mother_occupation,
    // }),
    Yup.object({
        email,
        password,
        phone_number,
    })
]

export const loginSchema = Yup.object({
    email,
    password,
})