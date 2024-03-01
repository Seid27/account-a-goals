import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, IconButton, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditCommentDialog({comment}){
    const dispatch = useDispatch();
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const handleOpenCommentDialog = () => setOpenCommentDialog(true);
    const handleCloseCommentDialog = () => setOpenCommentDialog(false);
    console.log('comment edit',comment);
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log("form json comment", formJson);
        dispatch({
            type: 'EDIT_ACCOUNTA_FRIEND_COMMENT',
            payload: {id:comment.id, goal_id: comment.goal_id, ...formJson}
        });
        handleCloseCommentDialog();
        
    }

    return(
        <>
        
            <IconButton onClick={()=>{handleOpenCommentDialog()}}>
                <EditIcon />
            </IconButton>
            <Dialog
             open={openCommentDialog}
             onClose={handleCloseCommentDialog}
             PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}}}
                >
                <DialogTitle>
                    Edit comment
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="comment_title"
                        name="comment_title"
                        label="Title"
                        defaultValue={comment.comment_title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="comment_desc"
                        name="comment_desc"
                        label="Description"
                        defaultValue={comment.comment_desc}
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