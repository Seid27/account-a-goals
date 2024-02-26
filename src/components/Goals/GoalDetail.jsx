import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import ActionPlansTable from "./ActionPlansTable";
import { Button } from "@mui/material";
import EditGoalDialog from "./EditGoalDialog";
import { useState } from "react";
export default function GoalDetail() {
    const {goalId} = useParams();
    const goals = useSelector(s=>s.goals);
    const goalSelected = goals.filter((goal)=>goal.id == goalId);
    console.log(goalSelected);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <h1>{goalSelected[0].goal_title}</h1>
            <p>{goalSelected[0].goal_desc}</p>
            <p>Goal Created on: {goalSelected[0].date_created}</p>
            <p>Goal Modified on: {goalSelected[0].date_modified}</p>
            <p>Target Date on: {goalSelected[0].target_date}</p>
            <p>Status: {goalSelected[0].status}</p>
            {/* todo: use search for accounta buddy name */}
            <p>Account-a-Buddy: {goalSelected[0].accounta_buddy_id}</p> 
            <Button onClick={handleClickOpen} variant="outlined">Edit Goal</Button>
            <EditGoalDialog 
                open={open}
                handleClose={handleClose}
                goal={goalSelected[0]}
            />
            <ActionPlansTable/>

            {/* <TableContainer component={Paper}>
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
                            <TableRow
                            hover
                            sx={{ cursor: 'pointer' }}
                            onClick={()=>{}}
                            >
                                <TableCell>
                                    Im gonna do th
                                </TableCell>
                                <TableCell>
                                    Pending
                                </TableCell>
                                <TableCell >
                                    <IconButton onClick={()=>{console.log('hello');}}>
                                        <EditIcon />
                                    </IconButton>
                                    
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>{console.log('hello');}}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                    
                                </TableCell>
                            </TableRow>
                        </TableBody>
                </Table>
            </TableContainer> */}
        </>
    )
    
}