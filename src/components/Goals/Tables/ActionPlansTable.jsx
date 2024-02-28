import { Box, Collapse, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell, TableContainer } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import AddActionPlanDialog from "../Dialogs/AddActionPlanDialog";
import EditActionPlanDialog from "../Dialogs/EditActionPlanDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";

export default function ActionPlansTable({goal_id}) {
    console.log('in action plan table',goal_id);
    const dispatch = useDispatch();
    const actionPlans = useSelector(s=>s.actionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    console.log(actionPlans);

    function fetchActionPlans() {
        dispatch({
            type: 'FETCH_ACTION_PLANS',
        });
    }

    useEffect(()=>{
        fetchActionPlans();
    },[]);


    function Row({actionPlan}) {
        const [open, setOpen] = useState(false);
        return (<>
                 <TableRow 
                    sx={{ '& > *': { borderBottom: 'unset'}}}
                    >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        {actionPlan.action_plan_title}
                    </TableCell>
                    <TableCell>
                        {actionPlan.status}
                    </TableCell>
                    {/* Edit */}
                    <TableCell >
                        <EditActionPlanDialog 
                        actionPlan={actionPlan}/>
                        
                    </TableCell>
                    {/* Delete */}
                    <TableCell>
                        <DeleteDialog action={'REMOVE_ACTION_PLANS'} id={actionPlan.id} title={actionPlan.action_plan_title}/>
                        
                    </TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6">
                                    Description: {actionPlan.action_plan_desc}
                                    </Typography> 
                                    <Typography>
                                    Date Created: {actionPlan.date_created}
                                    </Typography>
                                    <Typography>
                                    Target Date: {actionPlan.target_date}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
        </>) 
    }
    
    return (
        <>
            {/* <h1>Action Plans</h1> */}
            <AddActionPlanDialog goal_id={goal_id}/>
            <TableContainer component={Paper}>
                <Box>
                    <Typography
                        sx={{ flex: '1 1 100%', p:'20px' }}
                        variant="h4"
                        id="tableTitle"
                    >
                        Action Plans
                    </Typography>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                           <TableCell/>
                            <TableCell>Action Plan</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actionPlans.map((actionPlan)=>{
                            return (
                                <>
                                  <Row actionPlan={actionPlan} key={actionPlan.id}/> 
                                </>
                                
                        )})}
                        </TableBody>
                </Table>
            </TableContainer>
        </>
    )
    
}