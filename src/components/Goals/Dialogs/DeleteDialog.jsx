import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function DeleteDialog({action,id,title}) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dispatch = useDispatch();
    
    //Delete dialog control
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDelteDialog = () => setOpenDeleteDialog(false);


    //onSubmit
    function handleSubmit(event) {
        event.preventDefault();

        dispatch({
            type: action,
            payload: id
        })

        handleCloseDelteDialog();
    }

    return(
        <>
            <IconButton aria-label="delete" size="large" onClick={handleOpenDeleteDialog}>
                <DeleteForeverIcon fontSize='inherit'/>                
            </IconButton>

            <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDelteDialog}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>handleSubmit(event)}}
            >
                <DialogTitle>
                    <WarningIcon color="warning"/>
                    Delete
                </DialogTitle>
                <DialogContent>
                    Are you sure You want to delete "{title}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelteDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>

        </>
    )
    
}