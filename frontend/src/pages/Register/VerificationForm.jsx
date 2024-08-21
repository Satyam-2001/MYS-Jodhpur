import { useFormik } from "formik";
import { otpSchema } from "../../schemas/otpSchema";
import { Button, Paper, Stack, Typography } from "@mui/material";
import OTPInput from 'react-otp-input';
import { useMutation } from "@tanstack/react-query";
import axios from '../../services/axiosinstance'
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/UserSlice";


const initialValues = {
    otp: ''
}


const VerificationForm = ({ formData }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { mutateAsync: registerMutate } = useMutation({
        mutationFn: (data) => axios.post('/auth/register', data),
        onSuccess: (data) => {
            const { user, token } = data
            dispatch(userActions.setUser({ user, token }))
            navigate(`/profile`)
        },
    })

    const { mutate: resendOtpMutate } = useMutation({
        mutationFn: (data) => axios.post('/auth/otp/send', data),
        onSuccess: (data) => {
            console.log(data)
        },
    })


    const { values, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: otpSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: async (values, action) => {
                try {
                    const data = await registerMutate({ ...formData, ...values })
                    action.resetForm()
                }
                catch (e) {
                    action.setFieldError('otp', e.response.data.msg || 'Unknown error occured')
                }
            },
        });

    const resendOtpHandler = () => {
        resendOtpMutate(formData)
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Stack gap={1} sx={{ alignItems: 'center', p: 1 }}>
                <Typography variant='h2' sx={{ fontFamily: 'Lexend,sans-serif' }}>
                    Verify Email
                </Typography>
                <Typography variant='h5' textAlign={'center'} sx={{ py: 1 }}>
                    We've sent you a code via email.<br />
                    To complete the verification process please enter the 4 digit code below.
                </Typography>
                <OTPInput
                    inputStyle="inputStyle"
                    numInputs={4}
                    onChange={(value) => setFieldValue('otp', value)}
                    renderSeparator={<span> </span>}
                    value={values.otp}
                    inputType={'number'}
                    renderInput={(props) => <input name='otp' {...props} />}
                    shouldAutoFocus
                />
                {errors.otp && touched.otp && (
                    <Typography color='error'>
                        {errors.otp}
                    </Typography>
                )}
                <Button sx={{ margin: 1 }} onClick={resendOtpHandler}>
                    Resend
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                    Verify OTP
                </Button>
            </Stack>
        </Paper>
    )
}

export default VerificationForm