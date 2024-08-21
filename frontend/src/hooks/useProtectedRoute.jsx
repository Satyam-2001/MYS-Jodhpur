import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function useProtectedRoute() {
    const { isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/search')
        }
    }, [isLoggedIn])
}

export function usePrivateRoute() {
    const { isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/register')
    //     }
    // }, [isLoggedIn])
}