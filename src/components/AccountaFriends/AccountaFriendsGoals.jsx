import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, IconButton, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { Delete } from "@mui/icons-material";
import DeleteDialog from "../Goals/Dialogs/DeleteDialog";
import { useHistory } from "react-router-dom";

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
        history.push({pathname: `/accounta-friends-goal-detail/${goal_id}`});
        
    }
    
    return (
        <>
            <h1>Account-a-Friends Goals</h1>
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

            </List>


        </>
    )
}