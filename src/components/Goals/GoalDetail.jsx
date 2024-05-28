import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {Box,Button,IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";
import Chip from '@mui/material/Chip';
import EditDialog from "./Dialogs/EditDialog";
import AddDialog from "./Dialogs/AddDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import CollapsibleTable from "./Tables/CustomTable";
import CollapsableRow from "./Tables/CollapsableRow";
import StatusSelector from "../Misc/StatusSelector";
import DateSelector from "../Misc/DateSelector";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

// goal detail page
// shows info about each goal (title, description, status, date created, date modified of a goal)
// also displays action plan, reflection and comment tables
export default function GoalDetail() {
    const {goal_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const goalDetail = useSelector(s=>s.goalDetail);
    const [open, setOpen] = useState(false);
    const user = useSelector(store => store.user);

    // if deleteSuccess is true delete goal action  was successful 
    // take user to goals page
    // if (deleteSuccess === true ) {
    //     dispatch({type: 'SET_DELETE', payload: false});
    //     history.push('/');
    // }
    // const found = goalDetail.find((goal) => goal.id=== goal_id);

    // console.log('found ',found);
    // if (found === undefined) {
    //     history.push('/')
    // }
    function fetchGoalDetail(goal_id) {
        dispatch({
            type: 'FETCH_GOAL_DETAIL',
            payload: goal_id
        });
    }

    useEffect(()=>{
        fetchGoalDetail(goal_id);
    },[]);

    // function handleSubmit(event, formData) {
    //     event.preventDefault();
    //     // const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     console.log("form JSON", formJson);
    //     dispatch({
    //         type: action,
    //         payload: {id:value.id, ...formJson}
    //     });
    //     // handleClose();
    // }

    // removes a goal and redirects to home page
    // function handleRemoveGoal(event,goal_id) {
    //     event.preventDefault();
    //     dispatch({
    //         type: 'REMOVE_GOAL',
    //         payload: goal_id
    //     })
    //     history.push('/');
    // }
    
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

    

    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //     return;
    //     }

    //     setOpen(false);
    // };

    return (
        <>
            {/* <Snackbar open={open} autoHideDuration={6000}>
                <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                Delete was a success.
                </Alert>
            </Snackbar> */}
            {goalDetail[0] && <Box sx={{display: 'flex', flexDirection:'column', m: 3, p: 4}}  >
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', alignItems:'center', justifyContent:'left'}}>
                        <h1>{goalDetail[0]?.goal_title}</h1>
                        <Chip size="small" sx={{backgroundColor: chipColor(goalDetail[0]?.status), color:'white', ml:'20px'}} label={`${goalDetail[0]?.status}`}/> 
                    </Box>
                    {goalDetail[0].accounta_friend_id !== user.id &&
                    // edit goal
                    <EditDialog dialogTitle='Edit Goal'
                                user_id={user.id}
                                goal_id = {goal_id}
                                title = {goalDetail[0]?.goal_title}
                                description = {goalDetail[0]?.goal_desc}
                                action = 'EDIT_GOAL'>
                        <Button variant="contained" sx={{width:'200px',backgroundColor: '#fb8500', ":hover":{backgroundColor:"#ffb703"}}}>
                            Edit Goal
                        </Button> 
                        <StatusSelector status={goalDetail[0]?.status}/>
                        <DateSelector date={goalDetail[0]?.target_date}/>   
                    </EditDialog>}
                </Box>
                    
                <p>{goalDetail[0].goal_desc}</p>
                
                {/* More info about the selected goal */}
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <ul>
                        <li>Goal Created on: {dayjs(goalDetail[0].date_created).format('MM/DD/YYYY')}</li>
                        <li>Target Date on: {dayjs(goalDetail[0].target_date).format('MM/DD/YYYY')}</li>
                        <li>Goal Modified on: {dayjs(goalDetail[0].date_modified).format('MM/DD/YYYY')}</li>
                        <li>Account-a-Friend: {goalDetail[0].accounta_friend_name}</li>
                    </ul>
                </Box>

                {/* Action plan, reflection and comment tables */}
                <Box sx={{display: 'flex', alignItems: 'left',justifyContent:'left', flexDirection:'column', mt:2}}>
                    {/* action plan table */}
                    {goalDetail[0].accounta_friend_id !== user.id &&
                     <AddDialog
                        dialogTitle={'Add Action plan'}
                        id = {goal_id}
                        action='ADD_ACTION_PLAN'>
                            <StatusSelector/>
                            <DateSelector/>
                    </AddDialog>}
                    <CollapsibleTable tableHeadings={['Action Plans', 'Status', 'Edit', 'Delete' ]}>
                        {goalDetail[0]?.action_plans.map((actionPlan)=>
                        <CollapsableRow data={actionPlan}>
                            {goalDetail[0].accounta_friend_id !== user.id &&
                            <EditDialog
                                dialogTitle='Edit Action Plan' 
                                id ={actionPlan.id} 
                                goal_id = {goal_id}
                                title = {actionPlan.title}
                                description = {actionPlan.description}
                                action = 'EDIT_ACTION_PLAN'>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <StatusSelector status={actionPlan.status}/>
                                    <DateSelector date={actionPlan.target_date}/>
                            </EditDialog>}
                            {goalDetail[0].accounta_friend_id !== user.id &&
                            <DeleteDialog id={actionPlan.id} goal_id={goal_id} title={actionPlan.title} action='REMOVE_ACTION_PLANS'>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteForeverIcon color="error" fontSize='inherit'/>                
                                </IconButton>
                            </DeleteDialog>}
                        </CollapsableRow>)}
                    </CollapsibleTable>

                    {/* reflection table */}
                    {goalDetail[0].accounta_friend_id !== user.id &&
                    <AddDialog
                        dialogTitle={'Add Reflection'}
                        id = {goal_id}
                        action='ADD_REFLECTION'>
                    </AddDialog>}
                    <CollapsibleTable tableHeadings={['Reflections', 'Edit', 'Delete' ]}>
                        {goalDetail[0]?.reflections.map((reflection)=>
                        <CollapsableRow data={reflection}>
                            {goalDetail[0].accounta_friend_id !== user.id &&
                            <EditDialog
                                dialogTitle='Edit Reflection' 
                                id ={reflection.id} 
                                goal_id = {goal_id}
                                title = {reflection.title}
                                description = {reflection.description}
                                action = 'EDIT_REFLECTION'>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </EditDialog>}

                            {goalDetail[0].accounta_friend_id !== user.id &&
                            <DeleteDialog id={reflection.id} goal_id={goal_id} title={reflection.title} action='REMOVE_REFLECTION'>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteForeverIcon color="error" fontSize='inherit'/>                
                                </IconButton>
                            </DeleteDialog>}
                        </CollapsableRow>)}
                    </CollapsibleTable>

                    {/* comments table */}
                    {goalDetail[0].accounta_friend_id === user.id &&
                    <AddDialog
                        dialogTitle={'Add a Comment'}
                        id = {goal_id}
                        action='ADD_COMMENT'>
                    </AddDialog>}
                    <CollapsibleTable tableHeadings={['Comments', 'Edit', 'Delete' ]}>
                        {goalDetail[0]?.comments.map((comment)=>
                        <CollapsableRow data={comment}>
                            {goalDetail[0].accounta_friend_id === user.id &&
                            <EditDialog
                                dialogTitle='Edit Comment'
                                id = {comment.id}
                                goal_id = {goal_id}
                                title = {comment.title}
                                description = {comment.description}
                                action = 'EDIT_COMMENT'>
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                            </EditDialog>}
                            {goalDetail[0].accounta_friend_id === user.id &&
                            <DeleteDialog id={comment.id} goal_id={goal_id} title={comment.title} action='REMOVE_COMMENT'>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteForeverIcon color="error" fontSize='inherit'/>                
                                </IconButton>
                            </DeleteDialog>}
                        </CollapsableRow>)}
                    </CollapsibleTable>
                </Box>
            </Box>}
        </>
    )
    
}