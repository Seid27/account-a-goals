import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react"

// takes it a default date for a goal (target date of a goal)
export default function DateSelector(props) {
    const [date,setDate] = useState(props.date === undefined? dayjs() : props.date);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>
                <DatePicker 
                    id='targetDate'
                    name='targetDate'
                    label='Target Date'
                    defaultValue={dayjs(date)}
                    slotProps={{
                        textField: {
                        required: true,
                    },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
        
    )
    
}