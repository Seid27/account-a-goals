import { Dialog, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";


export default function EditActionPlanDialog({actionPlan}) {
    const [openEditActionPlanDialog, setOpenEditActionPlanDialog] = useState(false);
    const [openAddActionPlanDialog, setOpenAddActionPlanDialog] = useState(false);
    const handleOpenEditActionPlanDialog = () => setOpenEditActionPlanDialog(true);
    const handleCloseEditActionPlanDialog = () => setOpenEditActionPlanDialog(false);

    return(
        <>
            <IconButton onClick={()=>{
                                        console.log('hello form edit');
                                        handleOpenEditActionPlanDialog()}}>
                <EditIcon />
            </IconButton>
            <Dialog
             open={openEditActionPlanDialog}
             onClose={handleCloseEditActionPlanDialog}
             PaperProps={{
                component:'form'}}>
                <DialogTitle>
                    {actionPlan.action_plan_title}
                </DialogTitle>
            </Dialog>
        </>
    )
    
}