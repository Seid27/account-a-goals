import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle, IconButton } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";

// A reusable dialog for edit(update)
//  To edit goal, reflection, action plan and comment.
// Takes in title, data, label and action as props
// title is a string which is the title of the dialog Ex. Add a Goal
// value is an object with values to auto populate input fields if necessary
// label is an object with labels for the fields
// name is an object with name and id for the fields
// action is the name of the action to dipatch to saga Ex. EDIT_GOAL.
export default function EditDialog({title, value, label, name, action}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(value.status);
    console.log(value.status);

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
            payload: {id:value.id, ...formJson}
        });
        handleClose();
    }

    return(
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
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
                        defaultValue={value.title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id={name.description}
                        name={name.description}
                        label={label.description}
                        defaultValue={value.description}
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    {/* Shown status drop down only when editing a goal and an action plan(only goals and action plans have status) */}
                    {title == 'Edit Goal' || title == 'Edit Action Plan' &&
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
                                        
                    {/* Show target date only when editing a goal and an action plan(only goals and action plans have tareget dates) */}
                    {title == 'Edit Goal' || title == 'Edit Action Plan' &&
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>

                                <DatePicker 
                                    id={name.targetDate}
                                    name={name.targetDate}
                                    label={label.targetDate}
                                    defaultValue={dayjs(value.targetDate)}
                                    slotProps={{
                                        textField: {
                                        required: true,
                                    },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    }
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>{title}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}