import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddActionPlanDialog({goal_id}) {
    const [openAddReflectionDialog, setOpenReflectionDialog] = useState(false)
    const dispatch = useDispatch();

    const handleOpenAddRefelctionDialog = () => setOpenReflectionDialog(true);
    const handleCloseAddReflectionDialog = () => setOpenReflectionDialog(false);
    
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        dispatch({
            type: 'ADD_REFLECTION',
            payload: {...formJson,goal_id}
        });
        handleCloseAddReflectionDialog();
        
    }

    return (
        <>
        
            <Button onClick={handleOpenAddRefelctionDialog} variant="outlined">
                Add Reflection
            </Button>
            <Dialog
            open={openAddReflectionDialog}
            onClose={handleCloseAddReflectionDialog}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}}}
            >
                <DialogContent>
                    <DialogTitle sx={{p:'0px'}}>
                    Add Reflection
                    </DialogTitle>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="reflection_title"
                        name="reflection_title"
                        label="Title"
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="reflection_desc"
                        name="reflection_desc"
                        label="Description"
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleCloseAddReflectionDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Add</Button>
                </DialogActions>
                
            </Dialog>
        </>
    )
    
}