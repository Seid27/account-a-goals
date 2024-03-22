import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import ActionPlansTable from "./Tables/ActionPlansTable";
import ReflectionsTable from "./Tables/ReflectionsTable";
import { Box, Button, Container, Dialog, Grid, List, ListItem, ListItemText } from "@mui/material";
import EditGoalDialog from "./Dialogs/EditGoalDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";
import ViewComments from "./Dialogs/ViewCommentsDialog";
import CommentsTable from "./Tables/CommentsTable";
import comments from "../../redux/reducers/comments.reducer";
import DeleteDialog from "./Dialogs/DeleteDialog";
import Chip from '@mui/material/Chip';
import CustomDialog from "./Dialogs/AddDialog";
import EditDialog from "./Dialogs/EditDialog";

// goal detail page
// shows info about each goal (title, description, status, date created, date modified of a goal)
// also displays action plan, reflection and coment tables
export default function GoalDetail() {
    const {goal_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const goals = useSelector(s=>s.goals);
    const actionPlans = useSelector(s=>s.actionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    const reflections = useSelector(s=>s.reflections.filter((reflection)=>reflection.goal_id==goal_id));
    const comments = useSelector(s=>s.comments.filter((comment)=>comment.goal_id==goal_id));
    const goalSelected = goals.filter((goal)=>goal.id == goal_id);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    
    //Delete dialog control
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDelteDialog = () => setOpenDeleteDialog(false);

    function handleRemoveGoal(event,goal_id) {
        event.preventDefault();
        dispatch({
            type: 'REMOVE_GOAL',
            payload: goal_id
        })
        history.push('/');
    }
    
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

    return (
        <>
            <Box sx={{display: 'flex', flexDirection:'column'}}  >
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'left'}}>
                    <h1>{goalSelected[0].goal_title}</h1>
                    <Chip size="small" sx={{backgroundColor: chipColor(goalSelected[0].status), color:'white', ml:'20px'}} label={`${goalSelected[0].status}`}/>
                    <EditDialog 
                        title={'Edit Goal'}
                        value = {{
                            id: goalSelected[0].id,
                            title: goalSelected[0].goal_title,
                            description: goalSelected[0].goal_desc,
                            status: goalSelected[0].status,
                            targetDate: goalSelected[0].taregt_date //todo: fix typo
                        }}
                        label={{
                            title: 'Title',
                            description: 'Description',
                            targetDate : 'Target Date',
                        }}
                        name={{
                            title: 'goal_title',
                            description: 'goal_description',
                            targetDate: 'target_date'
                        }}
                        action='EDIT_GOAL'
                    />
                     <Button sx={{ml:'10px'}} onClick={handleOpenDeleteDialog} variant="outlined">Remove Goal</Button>
                </Box>
                    
                <p>{goalSelected[0].goal_desc}</p>
                

                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <ul>
                        <li>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</li>
                        <li>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</li>
                        <li>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</li>
                        <li>Account-a-Friend: {goalSelected[0].accounta_friend_name}</li>
                    </ul>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'left',justifyContent:'left', flexDirection:'column', mt:'10px'}}>
                    <ActionPlansTable goal_id={goal_id} actionPlans={actionPlans}/>
                    <ReflectionsTable goal_id={goal_id} reflections={reflections}/>
                    <CommentsTable goal_id={goal_id} comments={comments}/>
                </Box>
                

                <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDelteDialog}
                PaperProps={{
                    component:'form',
                    onSubmit: (event)=>handleRemoveGoal(event, goal_id)}}
                >
                    <DialogTitle>
                        <WarningIcon color="warning"/>
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        Are you sure You want to delete "{goalSelected[0].goal_title}"?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelteDialog} variant='outlined'>Cancel</Button>
                        <Button type='submit' variant='outlined'>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            
        </>
    )
    
}