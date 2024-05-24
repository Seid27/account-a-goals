import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../CustomButton/CustomButton";

export default function DeleteDialog(props) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const dispatch = useDispatch();
    //Delete dialog control
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: props.action,
            payload: {id:props.id, goal_id: props.goal_id}
        })
        handleCloseDeleteDialog();
        
    }

    //convert to array
    //this is because props.children is an object when only one child is passed as props
    let children = React.Children.toArray(props.children);

    return(
        <>
            <CustomButton onClick={handleOpenDeleteDialog}>
                {children[0]}
            </CustomButton>
            <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>handleSubmit(event)}}
            >
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'left'}}>
                <WarningIcon sx={{ml: '20px', pt:'10px'}} fontSize="large" color="warning"/>
                <DialogTitle sx={{pt:'20px', pl:'10px', pb:'0px'}}>
                {props.dialogTitle} 
                </DialogTitle>
                </Box>
                <DialogContent>
                    {`Are you sure You want to delete "${props.title}" goal?`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}