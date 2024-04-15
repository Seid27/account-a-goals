import { Box,Checkbox, Container, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteDialog from './Dialogs/DeleteDialog';
import CustomDialog from './Dialogs/AddDialog';
import AddDialog from './Dialogs/AddDialog';
import UserPage from '../UserPage/UserPage';

// This is goals page
// It displays a lsit of goals for a user
export default function Goals({name}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const goals = useSelector(s=>s.goals);

    //fetch all data for a user
    function fetchGoals() {
        dispatch({
            type: 'FETCH_GOALS'
        });
        dispatch({
            type: 'FETCH_ACTION_PLANS',
        });
        dispatch({
            type: 'FETCH_REFLECTIONS'
        });
        dispatch({
            type: 'FETCH_COMMENTS'
        }); 
    }

    useEffect(()=>{
        fetchGoals();
    },[]);

    // sends user to the goal detail page
    function handleGoalDetail(goal_id) {
        console.log(goal_id);
        history.push({pathname: `/detail/${goal_id}`});
        console.log(history);
    }

    // called when a user clicks on the check box
    // updates the status of a goal
    function handleChecked(event,goal){
        event.stopPropagation();
        console.log("goal status",goal.status);

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
                <Box sx={{p:2,
                        display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <h1>Welcome, {name}</h1>
                    <AddDialog
                        title={'Add a Goal'}
                        label={{
                            title: 'Title',
                            description: 'Description',
                            targetDate : 'Target Date',
                        }}
                        name={{
                            title: 'goal_title',
                            description: 'goal_description',
                            targetDate: 'target_date'
                        }}
                        action='ADD_GOAL'/>
                </Box>
                
                <List>
                    {
                        goals.map((goal) =>{
                                return (
                                
                                    <ListItem  key={goal.id} secondaryAction={
                                        <DeleteDialog action={'REMOVE_GOAL'} id={goal.id} title={goal.goal_title}/>
                                    }
                                    >

                                        <ListItemButton sx={{mr: '20px'}} onClick={()=>handleGoalDetail(goal.id)}>
                                            <ListItemIcon>
                                            <Checkbox 
                                                edge="start"
                                                checked = {goal.status === "Complete"}
                                                onClick={(event)=>handleChecked(event,goal)}
                                                //todo: add check handler to send update to goal status using axios
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