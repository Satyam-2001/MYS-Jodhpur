import * as Yup from "yup";
import { password } from ".";

const changePasswordSchema = Yup.object({
    password,
    confirm_password: Yup.string()
        .required("Please enter your password again")
        .oneOf([Yup.ref("password"), null], "Password must match"),
})

export default changePasswordSchema