import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle, IconButton } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import dayjs from "dayjs";

// A reusable dialog for edit(update) a goal, reflection, action plan and comment.
// title and descriptions are common fields for goal, reflection, action plan and comment.
// other input elements can be passed through props.children
export default function EditDialog(props){
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
            type: props.action,
            payload: {id:props.id, goal_id: props.goal_id, ...formJson}
        });
        handleClose();
    }

    console.log('edit props', props.children);
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
                onSubmit: (event)=>{handleSubmit(event)}}}>
                <DialogContent>
                    <DialogTitle sx={{p:'0px'}}>
                    {props.dialogTitle}
                    </DialogTitle>
                    <TextField
                        required
                        margin="normal"
                        id='title'
                        name='title'
                        label='Title'
                        defaultValue={props.title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id='description'
                        name='description'
                        label='Description'
                        defaultValue={props.description}
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />  
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}