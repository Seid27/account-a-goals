import { Dialog, DialogTitle } from "@mui/material";

export default function EditActionPlanDialog({open,handleClose,actionPlan}) {

    return(
        <>
            <Dialog
             open={open}
             onClose={handleClose}
             PaperProps={{
                component:'form'}}>
                <DialogTitle>
                    {actionPlan.action_plan_desc}
                </DialogTitle>
            </Dialog>
        </>
    )
    
}