import { Box,Button,Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteDialog from './Dialogs/DeleteDialog';
import AddDialog from './Dialogs/AddDialog';
import DateSelector from '../Misc/DateSelector';
import StatusSelector from '../Misc/StatusSelector';
import Search from '../Search/Search';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// This is goals page
// It displays a lsit of goals for a user
export default function Goals({goals, user_id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    // sends user to the goal detail page
    function handleGoalDetail(goal_id) {
        history.push({pathname: `/detail/${goal_id}`});
    }

    // called when a user clicks on the check box
    // updates the status of a goal
    function handleChecked(event,goal){
        event.stopPropagation();
        let newGoal = {...goal};
        if (goal.status === 'Pending' || goal.status === 'In Progress') {
            newGoal = {...newGoal,status: 'Complete'};
        }

        else{
            newGoal = {...newGoal,status: 'Pending'};
        }

        dispatch({
            type: 'EDIT_GOAL',
            payload: newGoal
        })
    }

    return (
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}  >
            <Box sx={{ width: '100%', maxWidth: 800,}}>
                <Box sx={{p:2, display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <AddDialog
                        dialogTitle={'Add a Goal'}
                        id = {user.id}
                        action='ADD_GOAL'>
                            <Search/>
                            <DateSelector/>
                            <StatusSelector/>
                    </AddDialog>
                </Box>
                <List>
                    {
                        goals.map((goal) =>{
                                return (
                                    <ListItem  key={goal.id} secondaryAction={
                                        <DeleteDialog
                                            id = {user.id}
                                            goal_id={goal.id} 
                                            dialogTitle='Delete Goal'
                                            title = {goal.goal_title} 
                                            action='REMOVE_GOAL'>
                                            <IconButton size='large'>
                                                <DeleteForeverRoundedIcon/>
                                            </IconButton>
                                        </DeleteDialog>
                                    }
                                    >
                                    <ListItemButton sx={{mr: '20px'}} onClick={()=>handleGoalDetail(goal.id)}>
                                        <ListItemIcon>
                                            <Checkbox 
                                                edge="start"
                                                checked = {goal.status === "Complete"}
                                                onClick={(event)=>handleChecked(event,goal)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={goal.goal_title}/>
                                    </ListItemButton>
                                    </ListItem>
                                );
                            }
                        )
                    }              
                </List>
            </Box>
        </Box>
    )
}