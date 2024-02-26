import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import ActionPlansTable from "./ActionPlansTable";
import { Button } from "@mui/material";
import EditGoalDialog from "./EditGoalDialog";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AddActionPlanDialog from "./AddActionPlanDialog";
export default function GoalDetail() {
    const {goalId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const goals = useSelector(s=>s.goals);
    const goalSelected = goals.filter((goal)=>goal.id == goalId);
    console.log(goalSelected);
    const [openAddActionPlanDialog, setOpenAddActionPlanDialog] = useState(false);
    const [openEditGoalDiablog, setOpenEditGoalDiablog] = useState(false);

    const handleOpenAddActionPlanDialog = () => {
        setOpenAddActionPlanDialog(true);
    };

    const handleCloseAddActionPlanDialog = () => {
        setOpenAddActionPlanDialog(false);
    };
    const handlOpenEditGoalDiablog = () => {
        setOpenEditGoalDiablog(true);
    };

    const handleCloseEditGoalDiablog = () => {
        setOpenEditGoalDiablog(false);
    };

    function handleRemoveGoal(goal_id) {
        dispatch({
            type: 'REMOVE_GOAL',
            payload: goal_id
        })
        history.push('/');
    }

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
            <Button onClick={handlOpenEditGoalDiablog} variant="outlined">Edit Goal</Button>
            <EditGoalDialog 
                open={openEditGoalDiablog}
                handleClose={handleCloseEditGoalDiablog}
                goal={goalSelected[0]}
            />
            <Button onClick={()=>handleRemoveGoal(goalId)} variant="outlined">Remove</Button>
            <h1>Action Plans</h1>
            <Button  variant="outlined" onClick={handleOpenAddActionPlanDialog}>Add Action Plan</Button>
            <AddActionPlanDialog open={openAddActionPlanDialog} onClose={handleCloseAddActionPlanDialog} goalId={goalId}/>
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