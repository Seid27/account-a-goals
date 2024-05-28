// takes in default value

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

// Dropped down to select status of a goal
export default function StatusSelector(props) {
    const [status, setStatus] = useState(props.status === undefined? 'Pending' : props.status);
    console.log('checking status ...',props.status);
    console.log('actual status',status);
    return (
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
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Complete'>Complete</MenuItem>
            </Select>
         </FormControl> 
    )
}