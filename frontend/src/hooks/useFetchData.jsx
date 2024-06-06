import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from '../store/UserSlice'
import { useQuery } from "@tanstack/react-query";
import axios from "../services/axiosinstance";

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
        queryFn: ({ signal }) => axios.get('/user/me', { signal }),
        enabled: !!localStorage.getItem('token'),
        staleTime: 30000,
    })

    useEffect(() => {
        if(isPending) return
        dispatch(userActions.setUser(data))
    }, [isPending])

}