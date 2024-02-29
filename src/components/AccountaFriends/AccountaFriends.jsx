import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function AccountaFriends() {
    const dispatch = useDispatch();
    function fetchAccountaFriends() {
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS'
        })
    }
    useEffect(()=>{
        fetchAccountaFriends();
    },[])
    return (
        <>
            <h1>AccountaFriends Page</h1>

        </>
    )
    
}