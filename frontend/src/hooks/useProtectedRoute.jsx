import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function useProtectedRoute(url) {
    const { isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate(url || '/search', { replace: true })
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