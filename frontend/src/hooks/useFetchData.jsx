import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../store/UserSlice'
import { useQuery } from "@tanstack/react-query";
import axios from "../services/axiosinstance";
import { chatActions } from "../store/ChatSlice";

export default function useFetchData() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    function JsonParse(str) {
        try {
            const obj = JSON.parse(str);
            return obj
        } catch (e) {
            return {};
        }
    }

    const profile = JsonParse(localStorage.getItem('user'))

    const { data, isPending } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: ({ signal }) => axios.get('/user', { signal }),
        enabled: !!localStorage.getItem('token'),
    })

    const { data: chats } = useQuery({
        queryKey: ['chats'],
        queryFn: ({ signal }) => axios.get('chat/list', { signal }),
        enabled: !!data,
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

    useEffect(() => {
        if (!chats) return
        dispatch(chatActions.setChats({ userId: user._id, chats }))
    }, [data, chats])

}