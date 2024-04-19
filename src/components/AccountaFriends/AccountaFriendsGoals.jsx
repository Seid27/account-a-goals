import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Goals from "../Goals/Goals";

export default function AcccountaFriendsGoals(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const accountaFriendsGoals = useSelector(s=>s.accountaFriendsGoals);
    const history = useHistory();
    console.log(accountaFriendsGoals);
    useEffect(()=>{
        fetchAccountaFriendGoals();
    },[])
    function fetchAccountaFriendGoals(){
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS_GOALS',
            payload: id
        })
    }

    function handleGoalDetail(goal_id) {
        history.push({pathname: `/detail/${goal_id}`});
        
    }
    
    return (
        <>

        <Goals goals={accountaFriendsGoals}/>
            {/* <h1>Account-a-Friends Goals</h1>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    accountaFriendsGoals?.map((goal) =>{
                    return (
                        <ListItem  key={goal.id} 
                        disablePadding
                        >
                            <ListItemButton onClick={()=>handleGoalDetail(goal.id)}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={goal.goal_title}/>
                            </ListItemButton>
                        </ListItem>
                        );
                    })
                }              

            </List> */}


        </>
    )
}