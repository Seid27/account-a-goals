import { Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import { styled } from '@mui/material/styles';
import EditDialog from "../Dialogs/EditDialog";

function NoData({tableHeadings}) {
    return (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                        <TableCell align="center">{tableHeadings[0]}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Box sx={{p:10, display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                            <img width="200px" src='/images/noData.jpg' alt="" />
                        </Box>
                    </TableCell>
                </TableRow>
            
            </TableBody>
        </Table>
    )
}
// function Row({row}) {
//     const [open, setOpen] = useState(false);
//     // used to create color for status
//     function chipColor(goal_status) {
//         if(goal_status == 'Complete'){
//             return 'green';
//         }
//         else if(goal_status == 'In progress' || goal_status == 'In Progress' ){
//             return '#f3722c';
//         }
//         else{
//             return '#ffc917'
//         }
//     }
//     console.log(row);
    
//     return (
//         <>
//             <TableRow>
//                 <TableCell>
//                     <IconButton aria-label="expand row"
//                                 size="small"
//                                 onClick={()=>setOpen(!open)}
//                     >
//                         {open? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell align="left">
//                     {row.title}
//                 </TableCell>
//                 {row.status && 
//                     <TableCell align="center">
//                         <Chip size="small" sx={{backgroundColor: chipColor(row.status), color:'white'}} label={`${row.status}`}/>
//                     </TableCell>}
//                 <TableCell align="center">
//                     <EditDialog
//                         dialogTitle={'Edit Reflection'} 
//                         id ={row.id} 
//                         title = {row.title}
//                         description = {row.description}/>
//                 </TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} align="left">
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6">
//                             {row.description}
//                             </Typography> 
//                             <Typography>
//                             Date Created: {dayjs(row.date_created).format('MM/DD/YYYY')}
//                             </Typography>
//                             {row.target_date && <Typography>
//                             Target Date: {dayjs(row.target_date).format('MM/DD/YYYY')}
//                             </Typography>}
//                             {row.date_modified && <Typography>
//                             Modified Date: {dayjs(row.date_modified).format('MM/DD/YYYY')}
//                             </Typography>}
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </>
//     )  
// }
export default function CollapsibleTable(props) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    console.log('props', props.children);
    console.log('table headings', props.tableHeadings);
    return(
        <TableContainer component={Paper} sx={{mb:5}}>
            {props.children.length===0? <NoData tableHeadings={props.tableHeadings}/>:
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                            <TableCell/>
                            {props.tableHeadings.map((heading,i)=>
                            (<TableCell key={i} align="center">{heading}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.children}
                    
                </TableBody>
            </Table>}
        </TableContainer>
    )
}