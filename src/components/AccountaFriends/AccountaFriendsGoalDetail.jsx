import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Box, Button, Chip } from "@mui/material";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function AcccountaFriendsGoalDetail() {
    const {goal_id} = useParams();
    const dispatch = useDispatch();
    const accountaFriendsGoal = useSelector(s=>s.accountaFriendsGoals.filter((goal)=>goal.id == goal_id));
    const actionPlans = useSelector(s=>s.accountaFriendsActionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    const reflections = useSelector(s=>s.accountaFriendsReflections.filter((reflection)=>reflection.goal_id==goal_id));
    const comments = useSelector(s=>s.accountaFriendsComments.filter((comment)=>comment.goal_id==goal_id));
    console.log('detail',actionPlans);
    
    function fetchAccountaFriendsData() {
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS_ACTION_PLANS',
            payload: goal_id
        });
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS_REFLECTIONS',
            payload: goal_id
        }); 
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS_COMMENTS',
            payload: goal_id
        }); 
    }

    useEffect(()=>{
        fetchAccountaFriendsData();
    },[]);

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

    
    return(<Box sx={{display: 'flex', flexDirection:'column'}}>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'left'}}>
            <h1>{accountaFriendsGoal[0].goal_title}</h1>
            <Chip size="small" sx={{backgroundColor: chipColor(accountaFriendsGoal[0].status), color:'white', ml:'20px'}} label={`${accountaFriendsGoal[0].status}`}/>
        </Box>
            
        <p>{accountaFriendsGoal[0].goal_desc}</p>

        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
            <ul>
                <li>Goal Created on: {dayjs(accountaFriendsGoal[0].date_created).format('MM/DD/YYYY')}</li>
                <li>Target Date on: {dayjs(accountaFriendsGoal[0].target_date).format('MM/DD/YYYY')}</li>
                <li>Goal Modified on: {dayjs(accountaFriendsGoal[0].date_modified).format('MM/DD/YYYY')}</li>
                <li>Account-a-Friend: {accountaFriendsGoal[0].accounta_friend_name}</li>
            </ul>
        </Box>
                {/* <p>Goal Created on: {accountaFriendsGoal[0].date_created}</p>
                <p>Goal Modified on: {accountaFriendsGoal[0].date_modified}</p>
                <p>Target Date on: {accountaFriendsGoal[0].target_date}</p> */}

                {/* todo: use search for accounta buddy name */}
                {/* <p>Account-a-Friend: {accountaFriendsGoal[0].accounta_friend_name}</p> */}
                {/* <EditGoalDialog goal={accountaFriendsGoal[0]}/> */}
                {/* <Button onClick={()=>handleRemoveGoal(goal_id)} variant="outlined">Remove</Button> */}
                {/* <ViewComments goal_id={goal_id}/> */}
                <Box sx={{display: 'flex', alignItems: 'left',justifyContent:'left', flexDirection:'column', mt:'10px'}}>
                    <ActionPlansTable goal_id={goal_id} actionPlans={actionPlans}/>
                    <ReflectionsTable goal_id={goal_id} reflections={reflections}/> 
                    <CommentsTable goal_id={goal_id} comments={comments}/>
                </Box>
                
            </Box>)
    
}