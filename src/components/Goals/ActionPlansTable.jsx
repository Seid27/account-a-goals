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
import AddActionPlanDialog from "./AddActionPlanDialog";
export default function ActionPlansTable() {
    const dispatch = useDispatch();
    const actionPlans = useSelector(s=>s.actionPlans);
    const [open, setOpen] = useState(false);
    const [selectedActionPlan, setSelectedActionPlan] = useState({});
    function fetchActionPlans() {
        dispatch({
            type: 'FETCH_ACTION_PLANS'
        });
    }

    useEffect(()=>{
        fetchActionPlans();
    },[]);

    function handleClickOpen() {
       
        // setSelectedActionPlan(actionPlan);
        setOpen(true);
        
    }

    function handleClose() {
        setOpen(false);
        
    }

    return (
        <>
            {/* <Button  variant="outlined" onClick={handleClickOpen}>Add Action Plan</Button>
            <AddActionPlanDialog open={open} onClose={handleClose} /> */}
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
                                    onClick={handleClickOpen}>
                                    <TableCell>
                                        {actionPlan.action_plan_title}
                                    </TableCell>
                                    <TableCell>
                                        {actionPlan.status}
                                    </TableCell>
                                    <TableCell >
                                        <IconButton onClick={(e)=>{ e.stopPropagation();console.log('hello');}}>
                                            <EditIcon />
                                        </IconButton>
                                        
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

            {/* <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                       {selectedActionPlan.action_plan_title} 
                    </DialogTitle>
                <DialogContent>
                    
                    <DialogContentText>
                        {selectedActionPlan.action_plan_desc}
                        
                    </DialogContentText>
                    <DialogContentText>

                        {selectedActionPlan.date_created}
                        
                    </DialogContentText>
                    
                </DialogContent>
            </Dialog> */}
        </>
    )
    
}