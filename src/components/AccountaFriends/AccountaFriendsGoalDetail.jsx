import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import EditGoalDialog from "../Goals/Dialogs/EditGoalDialog";
import { Button } from "@mui/material";
import ViewComments from "../Goals/Dialogs/ViewCommentsDialog";
import ActionPlansTable from "../Goals/Tables/ActionPlansTable";
import ReflectionsTable from "../Goals/Tables/ReflectionsTable";

export default function AcccountaFriendsGoalDetail() {
    const {goal_id} = useParams();
    const accountaFriendsGoal = useSelector(s=>s.accountaFriendsGoals.filter((goal)=>goal.id == goal_id));
    console.log(accountaFriendsGoal);

    return(<>
           <h1>{accountaFriendsGoal[0].goal_title}</h1>
            <p>{accountaFriendsGoal[0].goal_desc}</p>
            <p>Goal Created on: {accountaFriendsGoal[0].date_created}</p>
            <p>Goal Modified on: {accountaFriendsGoal[0].date_modified}</p>
            <p>Target Date on: {accountaFriendsGoal[0].target_date}</p>
            <p>Status: {accountaFriendsGoal[0].status}</p>
            {/* todo: use search for accounta buddy name */}
            <p>Account-a-Friend: {accountaFriendsGoal[0].accounta_friend_id}</p>
            {/* <EditGoalDialog goal={accountaFriendsGoal[0]}/> */}
            {/* <Button onClick={()=>handleRemoveGoal(goal_id)} variant="outlined">Remove</Button> */}
            <ViewComments goal_id={goal_id}/>
            <ActionPlansTable goal_id={goal_id}/>
            <ReflectionsTable goal_id={goal_id}/>

            
    </>)
    
}