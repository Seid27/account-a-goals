import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, IconButton, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";


export default function AddCommentDialog({goal_id}){
    const dispatch = useDispatch();
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const handleOpenCommentDialog = () => setOpenCommentDialog(true);
    const handleCloseCommentDialog = () => setOpenCommentDialog(false);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        dispatch({
            type:'ADD_COMMENT',
            payload: {...formJson, goal_id: goal_id}
        });

        handleCloseCommentDialog();
    
        
    }
    return (
        <>
            <Button variant="outlined" onClick={handleOpenCommentDialog}>Add a Comment</Button>
            <Dialog
             open={openCommentDialog}
             onClose={handleCloseCommentDialog}
             PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}
            }}
                >
                <DialogTitle>
                    Add Comment
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="comment_title"
                        name="comment_title"
                        label="Title"
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="action_plan_desc"
                        name="action_plan_desc"
                        label="Description"
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleCloseCommentDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}