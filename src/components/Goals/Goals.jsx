
import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function Goals() {
    const dispatch = useDispatch();
    const goals = useSelector(s=>s.goals);

    function fetchGoals() {
        dispatch({
            type: 'FETCH_GOALS'
        });
    }

    useEffect(()=>{
        fetchGoals();
    },[])

    return (
        <>
            <div>Your Goals</div>
            <Button sx={{ml:'85%'}} variant='contained' >Add a Goal</Button>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    goals.map((goal, i) =>{
                    return (
                        <ListItem  key={i} secondaryAction={
                            <IconButton aria-label="delete" size="large">
                                <Delete fontSize='inherit'></Delete>
                            </IconButton>
                        }
                        disablePadding
                        >

                            <ListItemButton>
                                <ListItemIcon>
                                <Checkbox 
                                    edge="end"
                                    checked = {goal.status === 'Complete'}
                                    //todo: add check handler to send update to goal status using axios
                                />
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