import { useState } from "react";
import { Box, Chip, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import EditDialog from "../Dialogs/EditDialog";
//creates a collabsable row using given props.data of action plan, reflection, commen
export default function CollapsableRow(props) {
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
    console.log('row data',props.data);

    
    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row"
                                size="small"
                                onClick={()=>setOpen(!open)}
                    >
                        {open? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    {props.data.title}
                </TableCell>
                {props.data.status && 
                    <TableCell align="center">
                        <Chip size="small" sx={{backgroundColor: chipColor(props.data.status), color:'white'}} label={`${props.data.status}`}/>
                    </TableCell>}
                <TableCell align="center">
                    {props.children}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#fffff3'}} colSpan={6} align="left">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {/* <Box sx={{ ml: 10, display:'flex', alignItems:'right', flexDirection:'column' }}>
                            <Typography variant="h6">
                            {props.data.description}
                            </Typography> 
                            <Typography>
                            Date Created: {dayjs(props.data.date_created).format('MM/DD/YYYY')}
                            </Typography>
                            {props.data.target_date && <Typography>
                            Target Date: {dayjs(props.data.target_date).format('MM/DD/YYYY')}
                            </Typography>}
                            {props.data.date_modified && <Typography>
                            Modified Date: {dayjs(props.data.date_modified).format('MM/DD/YYYY')}
                            </Typography>}
                        </Box> */}
                        
                        <Box sx={{ margin: 1 }}>
                            {/* <Typography variant="h6" gutterBottom component="div">
                                Detail
                            </Typography> */}
                            <Table size="small">
                                <TableHead>
                                <TableRow>
                                    <TableCell sx={{width: 400}}>Description</TableCell>
                                    <TableCell >Date Created</TableCell>
                                    <TableCell >{props.data.target_date && 'Target Date'}</TableCell>
                                    <TableCell >Date Modified</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{width: 400}}>
                                            {props.data.description}
                                        </TableCell>
                                        <TableCell >{dayjs(props.data.date_created).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell >
                                            {props.data.target_date && dayjs(props.data.target_date).format('MM/DD/YYYY')}
                                        </TableCell>
                                        <TableCell >
                                            {dayjs(props.data.date_modified).format('MM/DD/YYYY')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )  
}