//HEIGHT

import { heightFormat } from "../utils"

function getHeight() {
    const height = []
    for (let i = 48; i <= 84; i++) {
        height.push({
            value: i,
            name: heightFormat(i),
        })
    }
    return height
}

export const height = getHeight()
export const gender = ['Men', 'Women']
export const profile_managed_by = ['Self', 'Parent', 'Sibling', 'Relative/Friend', 'Other']
export const complexion = ['Fair', 'Wheatish', 'Dark']
export const weight_category = ['Thin', 'Fit', 'Fat']
export const manglik = ['Manglik', 'Non Manglik', 'Angshik Manglik']
export const diet = ['Vegetarian', 'Non Vegetarian', 'Jain', 'Eggetarian']
export const kundli_milan = ['Yes', 'No']
export const disability = ['Yes', 'No']
export const martial_status = ['Never Married', 'Divorce', 'Widow/Widower']
export const disease = ['None', 'Thalassemia', 'HIV+', 'Diabetes', 'Cancer', 'Other']
export const kundali_milan = ['Yes', 'No']