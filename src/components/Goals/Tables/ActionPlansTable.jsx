import { Button, DialogTitle } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { IconButton, TableCell, TableContainer } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import AddActionPlanDialog from "../Dialogs/AddActionPlanDialog";
import EditActionPlanDialog from "../Dialogs/EditActionPlanDialog";
export default function ActionPlansTable({goal_id}) {
    console.log('in action plan table',goal_id);
    const dispatch = useDispatch();
    const actionPlans = useSelector(s=>s.actionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    console.log(actionPlans);
    const [openDetailActionPlanDialog, setOpenDetailActionPlan] = useState(false);
    // const [selectedActionPlan, setSelectedActionPlan] = useState({});
    console.log();
    function fetchActionPlans() {
        dispatch({
            type: 'FETCH_ACTION_PLANS',
        });
    }

    useEffect(()=>{
        fetchActionPlans();
    },[]);
    
    return (
        <>
            <h1>Action Plans</h1>
            <AddActionPlanDialog goal_id={goal_id}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Action Plan</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actionPlans.map((actionPlan)=>{
                            return (
                                <TableRow key={
                                    actionPlan.id} 
                                    hover 
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell>
                                        {actionPlan.action_plan_title}
                                    </TableCell>
                                    <TableCell>
                                        {actionPlan.status}
                                    </TableCell>
                                    <TableCell >
                                        <EditActionPlanDialog 
                                        actionPlan={actionPlan}/>
                                        
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={()=>{console.log('hello');}}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                        
                                    </TableCell>

                                </TableRow>
                        )})}
                        </TableBody>
                </Table>
            </TableContainer>
        </>
    )
    
}