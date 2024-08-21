import * as Yup from "yup";
import { about_me, address, alternate_phone_number, complexion, date_of_birth, diet, disability, disease, education, email, father_name, father_occupation, gender, gotra_nanihal, gotra_self, height, income, kundli_milan, location, manglik, martial_status, mother_name, mother_occupation, name, occupation, phone_number, place_of_birth, profile_managed_by, time_of_birth, web_link, weight_category } from ".";


export const basicInfoSchema = Yup.object({
    name,
    date_of_birth,
    gender,
    profile_managed_by,
    education,
    occupation,
    income,
    location,
    height,
    weight_category,
    complexion,
    manglik,
    martial_status,
    disability,
    disease
})

export const aboutMeSchema = Yup.object({
    about_me
})

export const kundliSchema = Yup.object({
    place_of_birth,
    date_of_birth,
    time_of_birth,
})

export const familySchema = Yup.object({
    father_name,
    father_occupation,
    mother_name,
    mother_occupation
})

export const contactSchema = Yup.object({
    phone_number,
    alternate_phone_number,
    email,
    address,
    instagram: web_link,
    facebook: web_link,
})