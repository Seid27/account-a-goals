import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import ActionPlansTable from "./Tables/ActionPlansTable";
import ReflectionsTable from "./Tables/ReflectionsTable";
import { Box, Button, Container, Dialog, Grid } from "@mui/material";
import EditGoalDialog from "./Dialogs/EditGoalDialog";
import {DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
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
    

    return (
        <>
            
            {/* <Box display={'inline-flex'} width={'100%'} backgroundColor={'yellow'}justifyContent={"space-between"}>
                <Chip label={`${goalSelected[0].status}`}/>
                <Container sx={{backgroundColor: 'purple'}}>
                    <EditGoalDialog goal={goalSelected[0]}/>
                    <Button onClick={handleOpenDeleteDialog} variant="outlined">Remove</Button>
                </Container>
            </Box> */}

            <Grid container>
                <Grid item lg={8} md={8}>
                    <Chip label={`${goalSelected[0].status}`}/>
                </Grid>
                <Grid sx={{backgroundColor: 'yellow', display:'flex', justifyContent:'flex-end'}} item lg={4} md={4}>
                    <EditGoalDialog goal={goalSelected[0]}/>
                    <Button sx={{ml:'20px'}} onClick={handleOpenDeleteDialog} variant="outlined">Remove</Button>
                </Grid>
                <Grid>
                    
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={4} md={8}>
                    <p>Goal Created on: {goalSelected[0].date_created}</p>
                </Grid>
                <Grid  item lg={4} md={4}>
                    <p>Target Date on: {goalSelected[0].target_date}</p>
                </Grid>
                <Grid sx={{backgroundColor: 'yellow', display:'flex', justifyContent:'flex-end'}} item lg={4} md={4}>
                    <p>Goal Modified on: {goalSelected[0].date_modified}</p>
                </Grid>
            </Grid>
            
            <h1>{goalSelected[0].goal_title}</h1>
            <p>{goalSelected[0].goal_desc}</p>
            
            
            
            
            
            {/* <p>Status: {goalSelected[0].status}</p> */}
            {/* todo: use search for accounta buddy name */}
            <p>Account-a-Friend: {goalSelected[0].accounta_friend_name}</p>
           
            {/* <DeleteDialog type={'Button'} action={'REMOVE_GOAL'} id={goal_id} title={goalSelected[0].goal_title}/> */}
            {/* <ViewComments goal_id={goal_id}/> */}
            <ActionPlansTable goal_id={goal_id} actionPlans={actionPlans}/>
            <ReflectionsTable goal_id={goal_id} reflections={reflections}/>
            <CommentsTable goal_id={goal_id} comments={comments}/>

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
            
        </>
    )
    
}