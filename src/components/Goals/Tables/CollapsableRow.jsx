import { useState } from "react";
import { Box, Chip, Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
//creates a collabsable row using given data of action plan, reflection, commen
export default function CollapsableRow({id,title, description, status,targetDate, dateCreated, dateModified, editDialog, deleteDialog}) {
    const [open, setOpen] = useState(false);


    // used to create color for status
    function chipColor(goal_status) {
        if(goal_status == 'Complete'){
            return 'green';
        }
        else if(goal_status == 'In progress' || goal_status == 'In Progress' ){
            return '#f3722c';
        }
        else{
            return '#ffc917'
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>
                    {title}
                </TableCell>

                {status && 
                <TableCell>
                    <Chip size="small" sx={{backgroundColor: chipColor(status), color:'white'}} label={`${status}`}/>
                </TableCell>}
                <TableCell>
                    {editDialog}
                </TableCell>
                <TableCell>
                    {deleteDialog}
                </TableCell>

            </TableRow>
            {/* collapse row, a drop down*/}
            <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6">
                                {description}
                                </Typography> 
                                <Typography>
                                Date Created: {dayjs(dateCreated).format('MM/DD/YYYY')}
                                </Typography>
                                {targetDate && <Typography>
                                Target Date: {dayjs(targetDate).format('MM/DD/YYYY')}
                                </Typography>}
                                {dateModified && <Typography>
                                Modified Date: {dayjs(dateModified).format('MM/DD/YYYY')}
                                </Typography>}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
        </>
    )
    
}