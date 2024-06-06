import * as Yup from "yup";

const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const changePasswordSchema = Yup.object({
    password: Yup.string().required("Please enter your password").matches(passwordRegex, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirm_password: Yup.string()
        .required("Please enter your password again")
        .oneOf([Yup.ref("password"), null], "Password must match"),
})

export default changePasswordSchema