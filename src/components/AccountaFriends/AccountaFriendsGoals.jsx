import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Goals from "../Goals/Goals";

export default function AcccountaFriendsGoals(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const accountaFriendsGoals = useSelector(s=>s.accountaFriendsGoals);
    console.log(accountaFriendsGoals);
    useEffect(()=>{
        fetchAccountaFriendGoals();
    },[]);

    function fetchAccountaFriendGoals(){
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS_GOALS',
            payload: id
        })
    }
    
    return (
        <>
        <Goals goals={accountaFriendsGoals}/>
        </>
    )
}