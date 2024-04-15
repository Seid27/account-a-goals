import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import { Box, Button, Container, Dialog, Grid, List, ListItem, ListItemText } from "@mui/material";
import {DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useHistory } from "react-router-dom";
import Chip from '@mui/material/Chip';
import EditDialog from "./Dialogs/EditDialog";
import CustomTable from "./Tables/CusomTable";
import AddDialog from "./Dialogs/AddDialog";
import CollapsableRow from "./Tables/CollapsableRow";
import DeleteDialog from "./Dialogs/DeleteDialog";

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
    // const actionPlans = useSelector(s=>s.actionPlans);
    // const reflections = useSelector(s=>s.reflections);
    // const comments = useSelector(s=>s.comments);
    const goalSelected = goals.filter((goal)=>goal.id == goal_id); //an array with matching ID (only one item)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    
    //Delete dialog control
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDelteDialog = () => setOpenDeleteDialog(false);

    // removes a goal and redirects to home page
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

    //creates action plan rows for each action plan
    const actionPlanRows = [];
    actionPlans.map((item,i)=> actionPlanRows.push(
    <CollapsableRow 
                    key={i}
                    title={item.action_plan_title} 
                    description={item.action_plan_desc}
                    status={item.status} 
                    dateCreated={item.data_created} 
                    targetDate={item.target_date}
                    editDialog={<EditDialog 
                        title={'Edit Action Plan'}
                        value = {{
                            id: item.id,
                            title: item.action_plan_title,
                            description: item.action_plan_desc,
                            status: item.status,
                            targetDate: item.taregt_date //todo: fix typo
                        }}
                        label={{
                            title: 'Title',
                            description: 'Description',
                            targetDate : 'Target Date',
                        }}
                        name={{
                            title: 'action_plan_title',
                            description: 'action_plan_desc',
                            targetDate: 'target_date'
                        }}
                        action='EDIT_ACTION_PLAN'/> }
    />));

    //creates reflection rows for each action plan
    const reflectionRows = [];
    reflections.map((item,i)=> reflectionRows.push(
    <CollapsableRow key={i}
                    title={item.reflection_title} 
                    description={item.reflection_desc}
                    dateCreated={item.data_created} 
                    dateModified={item.date_modified}
                    editDialog={<EditDialog 
                        title={'Edit Reflection'}
                        value = {{
                            id: item.id,
                            title: item.reflection_title,
                            description: item.reflection_desc,
                        }}
                        label={{
                            title: 'Title',
                            description: 'Description',
                        }}
                        name={{
                            title: 'reflection_title',
                            description: 'reflection_desc',
                        }}
                        action='EDIT_REFLECTION'/> }
    />));
    //creates comment rows for each action plan
    const commentRows = [];
    comments.map((item,i)=> commentRows.push(
    <CollapsableRow key={i}
                    title={item.comment_title} 
                    description={item.comment_desc}
                    dateCreated={item.data_created} 
                    dateModified={item.date_modified}
                    editDialog={<EditDialog 
                        title={'Edit Comment'}
                        value = {{
                            id: item.id,
                            title: item.comment_title,
                            description: item.comment_desc,
                        }}
                        label={{
                            title: 'Title',
                            description: 'Description',
                        }}
                        name={{
                            title: 'comment_title',
                            description: 'comment_desc',
                        }}
                        action='EDIT_COMMENT'/> }
    />));


    //add action plan dialog
    const addActionPlanDialog = <AddDialog
            title={'Add Action plan'}
            label={{
                title: 'Title',
                description: 'Description',
            }}
            name={{
                title: 'action_plan_title',
                description: 'action_plan_desc',
            }}
            action='ADD_ACTION_PLAN'/>;

    //add reflection dialog
    const addReflectionDialog = <AddDialog
            title={'Add Reflection'}
            label={{
                title: 'Title',
                description: 'Description',
            }}
            name={{
                title: 'reflection_title',
                description: 'reflection_desc',
            }}
            action='ADD_REFLECTION'/>

    

    return (
        <>
            <Box sx={{display: 'flex', flexDirection:'column', m: 3, p: 4}}  >
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
                    <DeleteDialog action={'REMOVE_GOAL'} id={goalSelected[0].id} title={goalSelected[0].goal_title} />
                </Box>
                    
                <p>{goalSelected[0].goal_desc}</p>
                
                {/* More info about the selected goal */}
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <ul>
                        <li>Goal Created on: {dayjs(goalSelected[0].date_created).format('MM/DD/YYYY')}</li>
                        <li>Target Date on: {dayjs(goalSelected[0].target_date).format('MM/DD/YYYY')}</li>
                        <li>Goal Modified on: {dayjs(goalSelected[0].date_modified).format('MM/DD/YYYY')}</li>
                        <li>Account-a-Friend: {goalSelected[0].accounta_friend_name}</li>
                    </ul>
                </Box>

                {/* Action plan, reflection and comment tables */}
                <Box sx={{display: 'flex', alignItems: 'left',justifyContent:'left', flexDirection:'column', mt:2}}>
                    <CustomTable 
                    tableName={'Action Plans'}
                    headings={['Action Plan', 'Status', 'Edit', 'Delete' ]}
                                rows = {actionPlanRows}
                                addDialog={addActionPlanDialog} />
                    <CustomTable 
                    tableName={'Reflections'}
                    headings={['Reflections', 'Edit', 'Delete' ]}
                                rows = {reflectionRows}
                                addDialog={addReflectionDialog} />
                    <CustomTable 
                    tableName={'Comment'}
                    headings={['Comment', 'Edit', 'Delete' ]}
                                rows = {commentRows}/>
                </Box>
                
                {/* {type,action,id, goal_id,title} */}
                {/* <DeleteDialog action={'REMOVE_GOAL'}/> */}

                {/* <Dialog
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
                </Dialog> */}
            </Box>
            
        </>
    )
    
}