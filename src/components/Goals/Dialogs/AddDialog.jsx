import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Search from "../../Search/Search";

// A reusable dialog to add a goal, reflection, action plan and comment.
// title and descriptions are common fields for goal, reflection, action plan and comment.
// other input elements can be passed through props.children
export default function AddDialog(props){
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
            payload: {id:props.id, ...formJson}
        });
        handleClose();
    }
    return(
        <>
            <Button sx={{width:'200px',backgroundColor: '#fb8500', ":hover":{backgroundColor:"#ffb703"}}} onClick={handleClickOpen}  variant="contained">
                {props.dialogTitle}
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
                    {props.dialogTitle}
                    </DialogTitle>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id='title'
                        name='title'
                        label='Title'
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id='description'
                        name='description'
                        label='Description'
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    {/* any extra input fields for a specific add for instance add goal has status drop down 
                    while add reflection does not have status drop down  */}
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