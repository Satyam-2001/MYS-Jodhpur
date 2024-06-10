import { useContext } from "react"
import { ProfileContext } from "../../../../context/ProfileProvider"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { queryClient } from "../../../../services/http"
import { userActions } from "../../../../store/UserSlice"
import { useDispatch } from "react-redux"

export default function useUpdateProfile({ initialValues, mutationFn, validationSchema, onSubmit }) {
    const { profile, updateProfile } = useContext(ProfileContext)
    const dispatch = useDispatch()

    const { mutateAsync } = useMutation({
        mutationFn,
        onSuccess: ({ user, token }) => {
            dispatch(userActions.setUser({ user, token }))
            queryClient.setQueryData(['profile', profile?._id], user)
        }
    })
    const formikState = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values) => {
            try {
                const data = await mutateAsync(values)
                updateProfile(data.user)
                onSubmit()
            }
            catch (e) {
                console.log(e)
            }
        }
    })
    const { setValues, handleSubmit, isSubmitting } = formikState

    return { formikState, handleSubmit, isSubmitting }
}