import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from '../store/UserSlice'
import { useQuery } from "@tanstack/react-query";
import axios from "../services/axiosinstance";
import { connectSocket, socket } from '../services/socket'
import { chatActions } from "../store/ChatSlice";

export default function useFetchData() {
    const dispatch = useDispatch()

    // const { data: shortlist } = useQuery({
    //     queryKey: ['shortlist'],
    //     queryFn: ({ signal }) => axios.get('/user/shortlist', { signal }),
    //     placeholderData: (data) => data,
    //     staleTime: 30000,
    //     initialData: [],
    // })

    function JsonParse(str) {
        try {
            const obj = JSON.parse(str);
            return obj
        } catch (e) {
            return {};
        }
    }

    const { data, isPending } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: ({ signal }) => axios.get('/user', { signal }),
        enabled: !!localStorage.getItem('token'),
        staleTime: 30000,
    })

    useEffect(() => {
        if (!isPending) {
            dispatch(userActions.setUser(data))
        }
        else if (localStorage.getItem('token')) {
            const user = JsonParse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')
            dispatch(userActions.setUser({ user, token, set_local: false }))
        }
    }, [isPending])

}