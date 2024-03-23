
import { Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import EditDialog from "../Dialogs/EditDialog";

export default function CustomTable({tableName, headings, action, store, dialog}){
    const data = useSelector(s=>s[store]);
    const dispatch = useDispatch();
    function fetchData() {
        dispatch({
            type: action
        })
    }

    useEffect(()=>{
        fetchData();
    },[]);
    console.log('in custom',data);

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
        <TableContainer component={Paper}>
            {dialog}
            <Box>
                <Typography
                    sx={{ flex: '1 1 100%', p:'20px' }}
                    variant="h4"
                    id="tableTitle">
                    {tableName}
                </Typography>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {headings.map((heading)=>
                            <TableCell>
                                {heading}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>

                        {data.map((item,i)=> <Row key={i} item={item}/>)}
                </TableBody>
            </Table>
        </TableContainer>
        
    )

    function Row({item}) {
        const [open, setOpen] = useState(false);
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
                        {item.action_plan_title}
                    </TableCell>
                    <TableCell>
                        <Chip size="small" sx={{backgroundColor: chipColor(item.status), color:'white'}} label={`${item.status}`}/>
                    </TableCell>
                    <TableCell>
                    <EditDialog 
                                title={'Edit Action Plan'}
                                value = {{
                                    id: item.id,
                                    title: item.action_plan_title,
                                    description: item.action_plan_desc,
                                    status: item.status,
                                    targetDate: item.taregt_date //todo: fix typo
                                }}
                                label={{
                                    title: 'Title',
                                    description: 'Description',
                                    targetDate : 'Target Date',
                                }}
                                name={{
                                    title: 'action_plan_title',
                                    description: 'action_plan_desc',
                                    targetDate: 'target_date'
                                }}
                                action='EDIT_ACTION_PLAN'
                            />
                    </TableCell>
                    <TableCell>
                        title
                    </TableCell>

                </TableRow>
                {/* collapse row, a drop down*/}
                <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6">
                                    {item.action_plan_desc}
                                    </Typography> 
                                    <Typography>
                                    Date Created: {dayjs(item.date_created).format('MM/DD/YYYY')}
                                    </Typography>
                                    <Typography>
                                    Target Date: {dayjs(item.target_date).format('MM/DD/YYYY')}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
            </>
        )
        
    }
}