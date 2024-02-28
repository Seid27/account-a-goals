import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import ActionPlansTable from "./Tables/ActionPlansTable";
import ReflectionsTable from "./Tables/ReflectionsTable";
import { Button } from "@mui/material";
import EditGoalDialog from "./Dialogs/EditGoalDialog";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ViewComments from "./Dialogs/ViewCommentsDialog";
export default function GoalDetail() {
    const {goal_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const goals = useSelector(s=>s.goals);
    const goalSelected = goals.filter((goal)=>goal.id == goal_id);
    console.log(goalSelected);
    // const [openEditGoalDiablog, setOpenEditGoalDiablog] = useState(false);

    // const handlOpenEditGoalDiablog = () => {
    //     setOpenEditGoalDiablog(true);
    // };

    // const handleCloseEditGoalDiablog = () => {
    //     setOpenEditGoalDiablog(false);
    // };

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
            <EditGoalDialog goal={goalSelected[0]}/>
            <Button onClick={()=>handleRemoveGoal(goal_id)} variant="outlined">Remove</Button>
            <ViewComments goal_id={goal_id}/>
            <ActionPlansTable goal_id={goal_id}/>
            <ReflectionsTable goal_id={goal_id}/>
        </>
    )
    
}