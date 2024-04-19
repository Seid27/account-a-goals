import { Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import { styled } from '@mui/material/styles';

function NoData({tableHeading}) {
    return (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                        <TableCell align="center">{tableHeading[0]}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            <Box sx={{p:10, display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='/images/noData.jpg' alt="" />
            </Box>
            </TableBody>
        </Table>
        
    )
    
}
function Row(props) {
    const {row} = props;
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
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row"
                                size="small"
                                onClick={()=>setOpen(!open)}
                    >
                        {open? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}

                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    {row.title}
                </TableCell>

                {row.status && 
                <TableCell align="left">
                    <Chip size="small" sx={{backgroundColor: chipColor(row.status), color:'white'}} label={`${row.status}`}/>
                </TableCell>}
                {row.status && 
                <TableCell align="left">
                    <Chip size="small" sx={{backgroundColor: chipColor(row.status), color:'white'}} label={`${row.status}`}/>
                </TableCell>}
                {row.status && 
                <TableCell align="left">
                    <Chip size="small" sx={{backgroundColor: chipColor(row.status), color:'white'}} label={`${row.status}`}/>
                </TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} align="left">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6">
                            {row.description}
                            </Typography> 
                            <Typography>
                            Date Created: {dayjs(row.date_created).format('MM/DD/YYYY')}
                            </Typography>
                            {row.target_date && <Typography>
                            Target Date: {dayjs(row.target_date).format('MM/DD/YYYY')}
                            </Typography>}
                            {row.date_modified && <Typography>
                            Modified Date: {dayjs(row.date_modified).format('MM/DD/YYYY')}
                            </Typography>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
    
}
export default function CollapsibleTable({tableHeading, tableData}) {
    console.log(tableHeading);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    return(
        <TableContainer component={Paper} sx={{mb:5}}>
        {tableData.length===0? <NoData tableHeading={tableHeading}/>:
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                        <TableCell/>
                        {tableHeading.map((heading)=>
                        (<TableCell align="left">{heading}</TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((data)=>(
                    <Row row={data} />
                ))}
            </TableBody>
        </Table>}

    </TableContainer>
    )
    
}