import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, IconButton, DialogTitle } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditReflectionDialog({reflection}){
    const dispatch = useDispatch();
    const [openEditReflectionDialog, setOpenEditReflectionDialog] = useState(false);
    const handleOpenEditReflectionDialog = () => setOpenEditReflectionDialog(true);
    const handleCloseEditReflectionDialog = () => setOpenEditReflectionDialog(false);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        dispatch({
            type: 'EDIT_REFLECTION',
            payload: {id:reflection.id, ...formJson}
        });
        
    }
    return (
        <>
            <IconButton onClick={()=>{handleOpenEditReflectionDialog()}}>
                <EditIcon />
            </IconButton>
            <Dialog
             open={openEditReflectionDialog}
             onClose={handleCloseEditReflectionDialog}
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
                        defaultValue={reflection.reflection_title}
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
                        defaultValue={reflection.reflection_desc}
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditReflectionDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}