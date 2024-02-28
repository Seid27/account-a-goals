import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Divider } from '@mui/material';
import { useState } from "react";

export default function ViewComments() {
    const [openViewCommentsDialog, setOpenViewCommentsDialog] = useState(false);
    const handleOpenViewCommentsDialog = () => setOpenViewCommentsDialog(true);
    const handleCloseViewCommentsDialog = () => setOpenViewCommentsDialog(false);
    return(
    <>
    
        <Button onClick={handleOpenViewCommentsDialog} variant="outlined">
            View Comments
        </Button>
        <Dialog
                open={openViewCommentsDialog}
                onClose={handleCloseViewCommentsDialog}
                PaperProps={{
                    component:'form',
                    onSubmit: (event)=>{handleSubmit(event)}
                }}
            >
                <DialogContent>
                    <DialogTitle>Comments</DialogTitle>
                    <Divider/>
                    <DialogContentText>
                        
                       
                    </DialogContentText>
                    
                    
                </DialogContent>
            </Dialog>

    </>)
    
}