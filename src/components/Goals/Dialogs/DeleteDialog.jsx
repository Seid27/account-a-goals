import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function DeleteDialog({type,action,id, goal_id,title}) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dispatch = useDispatch();
    
    //Delete dialog control
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDelteDialog = () => setOpenDeleteDialog(false);


    //onSubmit
    function handleSubmit(event) {
        event.preventDefault();

        if (action === 'REMOVE_ACCOUNTA_FRIEND_COMMENT'){
            dispatch({
                type: action,
                payload: {id, goal_id}
            })
        }

        else{
            dispatch({
                type: action,
                payload: id
            })
        }
        
        handleCloseDelteDialog();

    }

    return(
        <>

        {type === 'Button'? <Button variant="outlined" onClick={handleOpenDeleteDialog}>Remove</Button> : 
            <IconButton aria-label="delete" size="large" onClick={handleOpenDeleteDialog}>
                <DeleteForeverIcon fontSize='inherit'/>                
            </IconButton>}

            

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