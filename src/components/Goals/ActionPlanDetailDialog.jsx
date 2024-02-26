import { Dialog, DialogContent, DialogContentText } from "@mui/material";

export default function ActionPlanDetailDialog({open,onClose}) {
    return(
        <>
            <Dialog
                open={open}
                close={onClose}
            >
                <DialogContent>
                    <DialogContentText>
                        <h1>This is Description page for action plans</h1>
                    </DialogContentText>
                    
                </DialogContent>
            </Dialog>
        </>
    )
    
}