import { Dialog, DialogContent, DialogContentText, FormControl, TextField, DialogActions, MenuItem, Select, InputLabel, Button, DialogTitle } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddActionPlanDialog({goal_id}) {
    console.log('open add action plan dialog');
    const [status, setStatus] = useState('Pending');
    const [openAddActionPlanDialog, setOpenAddActionPlanDialog] = useState(false)
    const dispatch = useDispatch();

    const handleOpenAddActionPlanDialog = () => setOpenAddActionPlanDialog(true);
    const handleCloseAddActionPlanDialog = () => setOpenAddActionPlanDialog(false);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        dispatch({
            type: 'ADD_ACTION_PLAN',
            payload: {...formJson,goal_id}
        });
        handleCloseAddActionPlanDialog();
    }

    return (
        <>
            <Button sx={{width:'200px',backgroundColor: '#619b8a', ":hover":{backgroundColor:"#a1c181"}}} onClick={handleOpenAddActionPlanDialog}  variant="contained">
                Add Action Plan
            </Button>
            <Dialog
            open={openAddActionPlanDialog}
            onClose={handleCloseAddActionPlanDialog}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}}}
            >
                <DialogContent>
                    <DialogTitle sx={{p:'0px'}}>
                    Add Action Plan
                    </DialogTitle>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="action_plan_title"
                        name="action_plan_title"
                        label="Action"
                        type='text'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="action_plan_desc"
                        name="action_plan_desc"
                        label="Description"
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
                    <Button  onClick={handleCloseAddActionPlanDialog} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Add</Button>
                </DialogActions>
                
            </Dialog>
        </>
    )
    
}