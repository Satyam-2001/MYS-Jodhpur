import * as Yup from "yup";

const otpRegex = /^[0-9]*$/;

export const otpSchema = Yup.object({
    otp: Yup.string().required('Please Enter your otp').length(4, 'OTP must have 4 digits').matches(otpRegex, 'OTP consists of only numbers')
})