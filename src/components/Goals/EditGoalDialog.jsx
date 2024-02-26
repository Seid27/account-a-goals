import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function EditGoalDialog({open, handleClose, goal}) {
    const [status, setStatus] = useState(goal.status);
    const dispatch = useDispatch();
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        // let newGoal = {...goal,...formJson}
        // console.log('form json', formJson);
        // console.log('form json', goal);
        dispatch({
            type: 'EDIT_GOAL',
            payload: {id:goal.id, ...formJson}
        })
        handleClose();
    }

    return (
        <>
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
                        Edit Goal
                       
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="goal_title"
                        name="goal_title"
                        label="Title"
                        value={goal.goal_title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="goal_desc"
                        name="goal_desc"
                        label="Description"
                        value={goal.goal_desc}
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth sx={{mt:1}}>
                        <InputLabel id='status_label'>Status</InputLabel>
                        <Select
                        required
                        labelId='status_label'
                        label="Status"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value='Pending'>Pending</MenuItem>
                            <MenuItem value='In progress'>In Progress</MenuItem>
                            <MenuItem value='Complete'>Complete</MenuItem>
                        </Select>
                        
                    </FormControl>
                    {/* <Search
                    /> */}
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>

                            <DatePicker 
                                id="target_date"
                                name="target_date"
                                label="Target Date"
                                value={dayjs(goal.taregt_date)}
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
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}