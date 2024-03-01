import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, IconButton, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search/Search';
import { useHistory } from 'react-router-dom';
import DeleteDialog from './Dialogs/DeleteDialog';
export default function Goals() {
    const dispatch = useDispatch();
    const history = useHistory();
    const goals = useSelector(s=>s.goals);
    const [open, setOpen] = useState(false);
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

    function handleClickOpen() {
        setOpen(true);
        
    }

    function handleClose() {
        setOpen(false);
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        dispatch({
            type: 'ADD_GOAL',
            payload: {...formJson, "accounta_friend_id": 2}
        })
        handleClose();
    }

    function handleGoalDetail(goal_id) {
        console.log(goal_id);
        history.push({pathname: `/detail/${goal_id}`});
        console.log(history);
    }

    function handleRemoveGoal(goal_id){
        dispatch({
            type: 'REMOVE_GOAL',
            payload: goal_id
        })
    }

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
        <>
            <div>Your Goals</div>
            <Button  sx={{ml:'85%'}} variant='contained' onClick={handleClickOpen} >Add a Goal</Button>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    goals.map((goal) =>{
                    return (
                        <ListItem  key={goal.id} secondaryAction={
                            <DeleteDialog action={'REMOVE_GOAL'} id={goal.id} title={goal.goal_title}/>
                        }
                        disablePadding
                        >

                            <ListItemButton onClick={()=>handleGoalDetail(goal.id)}>
                                <ListItemIcon>
                                <Checkbox 
                                    edge="end"
                                    checked = {goal.status === "Complete"}
                                    onClick={(event)=>handleChecked(event,goal)}
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

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component:'form',
                    onSubmit: (event)=>{handleSubmit(event)}
                }}
            >
                <DialogContent>
                    <DialogContentText>
                        Add a Goal
                       
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="goal_title"
                        name="goal_title"
                        label="Title"
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="goal_desc"
                        name="goal_desc"
                        label="Description"
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    <Search/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>
                            <DatePicker 
                                id="target_date"
                                name="target_date"
                                label="Target Date"
                                 slotProps={{
                                    textField: {
                                    required: true,
                                 },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}