import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
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
    }

    return(
        <>
            <CustomButton onClick={handleOpenDeleteDialog}>
                {props.children}
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
                Delete
                </DialogTitle>
                </Box>
                <DialogContent>
                    Are you sure You want to delete "title"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}