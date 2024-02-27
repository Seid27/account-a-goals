import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useState } from "react";

export function ActionPlanDetailDialog({open, handleClose, actionPlan }) {

    const handleClick = ()=>handleClose();
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClick}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}