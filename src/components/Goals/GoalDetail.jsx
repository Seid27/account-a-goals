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
export default function GoalDetail() {
    const {goal_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const goals = useSelector(s=>s.goals);
    const actionPlans = useSelector(s=>s.actionPlans.filter((action_plan)=> action_plan.goal_id == goal_id));
    const reflections = useSelector(s=>s.reflections.filter((reflection)=>reflection.goal_id==goal_id));
    const comments = useSelector(s=>s.comments.filter((comment)=>comment.goal_id==goal_id));
    const goalSelected = goals.filter((goal)=>goal.id == goal_id);
    console.log('comments--detail',comments);
    console.log(goalSelected);
    // const [openEditGoalDiablog, setOpenEditGoalDiablog] = useState(false);

    // const handlOpenEditGoalDiablog = () => {
    //     setOpenEditGoalDiablog(true);
    // };

    // const handleCloseEditGoalDiablog = () => {
    //     setOpenEditGoalDiablog(false);
    // };

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
            
            {/* <Box display={'inline-flex'} width={'100%'} backgroundColor={'yellow'}justifyContent={"space-between"}>
                <Chip label={`${goalSelected[0].status}`}/>
                <Container sx={{backgroundColor: 'purple'}}>
                    <EditGoalDialog goal={goalSelected[0]}/>
                    <Button onClick={handleOpenDeleteDialog} variant="outlined">Remove</Button>
                </Container>
            </Box> */}
            {/* dayjs(comment.date_created).format('DD/MM/YYYY') */}
            <Box sx={{display: 'flex', flexDirection:'column'}}  >
                <Box sx={{display: 'flex', alignItems:'center', justifyContent:'left'}}>
                    <h1>{goalSelected[0].goal_title}</h1>
                    <Chip size="small" sx={{backgroundColor: chipColor(goalSelected[0].status), color:'white', ml:'20px'}} label={`${goalSelected[0].status}`}/>
                </Box>
                    
                <p>{goalSelected[0].goal_desc}</p>
                

                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <ul>
                        <li>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</li>
                        <li>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</li>
                        <li>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</li>
                        <li>Account-a-Friend: {goalSelected[0].accounta_friend_name}</li>
                    </ul>

                    <Box sx={{display: 'flex', alignItems:'start', justifyContent:'left', mt:'10px'}}>
                            <EditGoalDialog goal={goalSelected[0]}/>
                            <Button sx={{ml:'10px'}} onClick={handleOpenDeleteDialog} variant="outlined">Remove Goal</Button>
                    </Box>
                </Box>

                {/* <EditGoalDialog goal={goalSelected[0]}/>
                <Button sx={{ml:'20px'}} onClick={handleOpenDeleteDialog} variant="outlined">Remove</Button> */}
                

                
                

                {/* <List>
                    <ListItem>
                        <ListItemText>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</ListItemText>
                    </ListItem>
                </List> */}
                {/* <p>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</p>
            
                <p>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</p>
            
                <p>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</p> */}
                

                {/* <Grid container>
                    <Grid item>
                        <p>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</p>
                    </Grid>
                    <Grid sx={{backgroundColor: 'yellow'}} item >
                        <p>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</p>
                    </Grid>
                    <Grid sx={{backgroundColor: 'yellow'}} item >
                        <p>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</p>
                    </Grid>
                </Grid> */}
                
                
                
                
                
                
                
                {/* <p>Status: {goalSelected[0].status}</p> */}
                {/* todo: use search for accounta buddy name */}
                
            
                {/* <DeleteDialog type={'Button'} action={'REMOVE_GOAL'} id={goal_id} title={goalSelected[0].goal_title}/> */}
                {/* <ViewComments goal_id={goal_id}/> */}

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