import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, IconButton, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";


export default function EditActionPlanDialog({actionPlan}) {
    console.log(actionPlan.status);
    const [status, setStatus] = useState(actionPlan.status);
    const [openEditActionPlanDialog, setOpenEditActionPlanDialog] = useState(false);
    const handleOpenEditActionPlanDialog = () => setOpenEditActionPlanDialog(true);
    const handleCloseEditActionPlanDialog = () => setOpenEditActionPlanDialog(false);

    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return(
        <>
        
            <IconButton onClick={()=>{handleOpenEditActionPlanDialog()}}>
                <EditIcon />
            </IconButton>
            <Dialog
             open={openEditActionPlanDialog}
             onClose={handleCloseEditActionPlanDialog}
             PaperProps={{
                component:'form'}}
                onSubmit={(e)=>handleSubmit(e)}
                >
                <DialogTitle>
                    Edit Action Plan
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="action_plan_title"
                        name="action_plan_title"
                        label="Action Plan"
                        value={actionPlan.action_plan_title}
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="action_plan_desc"
                        name="action_plan_desc"
                        label="Description"
                        value={actionPlan.action_plan_desc}
                        type='text'
                        multiline
                        rows={5}
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth sx={{mt:1}}>
                        <InputLabel id='status_label'>Status</InputLabel>
                        <Select
                        required
                        labelId='status_label'
                        label="Status"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value='Pending'>Pending</MenuItem>
                            <MenuItem value='In progress'>In Progress</MenuItem>
                            <MenuItem value='Complete'>Complete</MenuItem>
                        </Select>
                        
                    </FormControl>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>

                            <DatePicker 
                                id="target_date"
                                name="target_date"
                                label="Target Date"
                                value={dayjs(actionPlan.taregt_date)}
                                 slotProps={{
                                    textField: {
                                    required: true,
                                 },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleCloseEditActionPlanDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}