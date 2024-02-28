import { Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Divider } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
export default function ViewComments({goal_id}) {
    const comments = useSelector(s=>s.comments.filter((comment)=>comment.goal_id == goal_id));
    const dispatch = useDispatch();
    console.log('comments', comments);
    const [openViewCommentsDialog, setOpenViewCommentsDialog] = useState(false);
    const handleOpenViewCommentsDialog = () => setOpenViewCommentsDialog(true);
    const handleCloseViewCommentsDialog = () => setOpenViewCommentsDialog(false);

    function fetchComments() {
        dispatch({
            type: 'FETCH_COMMENTS'
        });
        
    }

    useEffect(()=>{
        fetchComments();
    },[]);
    return(
    <>
    
        <Button onClick={handleOpenViewCommentsDialog} variant="outlined">
            View Comments
        </Button>
        <Dialog
                open={openViewCommentsDialog}
                onClose={handleCloseViewCommentsDialog}
                PaperProps={{
                    component:'form',
                    onSubmit: (event)=>{handleSubmit(event)}
                }}
            >
                <DialogContent>
                        <Paper variant="outlined">
                            <img src="https://images.unsplash.com/photo-1604651901258-822bd831b594?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </Paper>
                        {/* <Card >
                            <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="https://images.unsplash.com/photo-1708770362006-7f8e5b02b0f5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Live from space album cover"
                                />
                                <CardContent>
                                    <List>
                                        {comments.map((comment)=>{
                                            <ListItem>
                                                <ListItemText primary={comment.comment_title}/>
                                    
                                        </ListItem>
                                    })}
                                        
                                        

                                    </List>
                                    
                                </CardContent>
                                
                        </Card> */}
                        <DialogTitle sx={{p:'0px', mt:'10px'}}>
                            Comments
                        </DialogTitle>
                        <DialogContentText>
                            <List sx={{p:'0px'}}>
                                {comments.map((comment,i)=>{
                                    return (
                                    <>
                                        <ListItem key={comment.id}>
                                        <ListItemText primary={
                                             <>
                                             <Typography
                                             component="span"
                                             >
                                             {comment.comment_title}
                                             </Typography>

                                             <Typography sx={{ display: 'inline'}} component="span">
                                             {` - ${dayjs(comment.date_created).format('DD/MM/YYYY')}`}
                                             </Typography>
                                         </>
                                         } secondary=
                                        {comment.comment_desc}/>
                                        </ListItem>
                                        <Divider component="li" />
                                    </>
                                    
                                    )  
                                })}
                                
                            </List>
                        </DialogContentText>
                        <Paper>
                            
                        </Paper>

                        {/* <List>
                            {comments.map((comment)=>{
                                return (<ListItem key={comment.id}>

                                    <ListItemText primary={comment.comment_title} secondary={
                                        <>
                                            <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                            >
                                            {comment.date_created}
                                            </Typography>
                                            {`- ${comment.comment_desc}`}
                                      </>
                                    }/>
                                </ListItem>)
                            })}
                        </List> */}
                    
                    
                </DialogContent>
            </Dialog>

    </>)
    
}