import { Box, Chip, Collapse, Typography } from "@mui/material";
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
import dayjs from "dayjs";

export default function ActionPlansTable({goal_id, actionPlans}) {
    console.log('in action plan table',goal_id);
    const dispatch = useDispatch();
    // const actionPlans = useSelector(s=>s.actionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    const goal = useSelector(s=>s.accountaFriendsGoals.filter((goal)=> goal.id == goal_id));
    const user = useSelector((store) => store.user);

    console.log('compare ', user.id, goal[0]?.accounta_friend_id );
    console.log(actionPlans);

    // function fetchActionPlans() {
    //     dispatch({
    //         type: 'FETCH_ACTION_PLANS',
    //     });
    // }

    // useEffect(()=>{
    //     fetchActionPlans();
    // },[]);
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
                        
                        <Chip size="small" sx={{backgroundColor: chipColor(actionPlan.status), color:'white'}} label={`${actionPlan.status}`}/>
                    </TableCell>
                    {/* Edit */}
                    {user.id != goal[0]?.accounta_friend_id && 
                    <TableCell >
                        <EditActionPlanDialog 
                        actionPlan={actionPlan}/>
                        
                    </TableCell>}
                    {/* Delete */}
                    {user.id != goal[0]?.accounta_friend_id && 
                    <TableCell>
                        <DeleteDialog action={'REMOVE_ACTION_PLANS'} id={actionPlan.id} title={actionPlan.action_plan_title}/>
                        
                    </TableCell>}
                    {/* <TableCell>
                        <DeleteDialog action={'REMOVE_ACTION_PLANS'} id={actionPlan.id} title={actionPlan.action_plan_title}/>
                        
                    </TableCell> */}

                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6">
                                    {actionPlan.action_plan_desc}
                                    </Typography> 
                                    <Typography>
                                    Date Created: {dayjs(actionPlan.date_created).format('MM/DD/YYYY')}
                                    </Typography>
                                    <Typography>
                                    Target Date: {dayjs(actionPlan.target_date).format('MM/DD/YYYY')}
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
            {/* {user.id != goal[0]?.accounta_friend_id && <AddActionPlanDialog goal_id={goal_id}/>} */}

            
            <TableContainer component={Paper} elevation={1}>
            {user.id != goal[0]?.accounta_friend_id && <AddActionPlanDialog goal_id={goal_id}/>}
                <Box>
                    <Typography
                        sx={{ flex: '1 1 100%', p:'20px' }}
                        variant="h4"
                        id="tableTitle"
                    >
                        Action Plans
                    </Typography>
                </Box>

                {actionPlans.length===0? <Box sx={{display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='../public/images/noData.jpg' alt="" />
                </Box>:
                <Table>
                    <TableHead>
                        <TableRow>
                           <TableCell/>
                            <TableCell>Action Plan</TableCell>
                            <TableCell>Status</TableCell>
                            {user.id != goal[0]?.accounta_friend_id && 
                            <TableCell>Edit</TableCell>}
                            {user.id != goal[0]?.accounta_friend_id && 
                            <TableCell>Delete</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actionPlans.map((actionPlan)=>
                                  <Row actionPlan={actionPlan} key={actionPlan.id}/> )}
                        </TableBody>
                </Table>}
            </TableContainer>
        </>
    )
    
}