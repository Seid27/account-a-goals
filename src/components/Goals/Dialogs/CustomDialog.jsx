import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Search from "../../Search/Search";

// A reusable dialog
//  To add a goal, reflection, action plan, and comment,
//  and also to edit goal, reflection, action pland and comment.
// Takes in title, data, label and action as props
// title is a string which is the title of the dialog Ex. Add a Goal
// values is an object with values to auto populate input fields if necessary
// label is an object with labels for the fields
// name is an object with name and id for the fields
// action is the name of the action to dipatch to saga Ex. Add_A_GOAL.
export default function CustomDialog({title, label, name, action}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log("form JSON", formJson);
        dispatch({
            type: action,
            payload: formJson
        })
        handleClose();
    }

    return(
        <>
        <Button sx={{width:'200px',backgroundColor: '#619b8a', ":hover":{backgroundColor:"#a1c181"}}} onClick={handleClickOpen}  variant="contained">
                {title}
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}}}
            >
                <DialogContent>
                    <DialogTitle sx={{p:'0px'}}>
                    {title}
                    </DialogTitle>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id={name.title}
                        name={name.title}
                        label={label.title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id={name.description}
                        name={name.description}
                        label={label.description}
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    {/* Shown only when adding a goal */}
                    {title == 'Add a Goal' && <Search/>}
                    {/* Shown only when editing a goal */}
                    {title == 'Edit Goal' &&
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
                    </FormControl>}
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>

                            <DatePicker 
                                id={name.targetDate}
                                name={name.targetDate}
                                label={label.targetDate}
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
                    <Button type='submit' variant='outlined'>{title}</Button>
                </DialogActions>
                
            </Dialog>
        </>
    )
}