import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, Typography } from "@mui/material";
import AddReflectionDialog from "../Dialogs/AddReflectionDialog"
import EditReflectionDialog from "../Dialogs/EditReflectionDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import EditCommentDialog from "../Dialogs/EditCommentDialog";

export default function CommentsTable({goal_id, comments}) {
    const goal = useSelector(s=>s.accountaFriendsGoals.filter((goal)=> goal.id == goal_id));
    const user = useSelector((store) => store.user);
    function Row({comment}) {
        const [open, setOpen] = useState(false);
        return (<>
                 <TableRow 
                    sx={{ '& > *': { borderBottom: 'unset'}}}
                    >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        {comment.comment_title}
                    </TableCell>
                    {/* Edit */}
                    {user.id == goal[0]?.accounta_friend_id &&
                    <TableCell >
                        <EditCommentDialog
                        comment={comment}/>
                    </TableCell>
                    }
                    {/* {user.id != goal[0]?.accounta_friend_id &&
                    <TableCell >
                        <EditReflectionDialog 
                        reflection={reflection}/>
                    </TableCell>
                    } */}
                    
                    {/* Delete */}
                    {/* {user.id != goal[0]?.accounta_friend_id &&
                    <TableCell>
                        
                        <DeleteDialog action={'REMOVE_REFLECTION'} id={reflection.id} title={reflection.reflection_title}/>
                        
                    </TableCell>
                    } */}

                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6">
                                    Description: {comment.comment_desc}
                                    </Typography> 
                                    <Typography>
                                    Date Created: {comment.date_created}
                                    </Typography>
                                    <Typography>
                                    Target Date: {comment.date_modified}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
        </>) 
    }
    return (
        <>
            {user.id == goal[0]?.accounta_friend_id &&<AddReflectionDialog goal_id={goal_id}/>}
            <TableContainer component={Paper}>
                <Box>
                    <Typography
                        sx={{ flex: '1 1 100%', p:'20px' }}
                        variant="h4"
                        id="tableTitle"
                    >
                        Comments
                    </Typography>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                           <TableCell/>
                            <TableCell>Comments</TableCell>
                            {user.id == goal[0]?.accounta_friend_id && 
                            <TableCell>Edit</TableCell>}
                            {user.id == goal[0]?.accounta_friend_id && 
                            <TableCell>Delete</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment)=>{
                            return (
                                  <Row comment={comment} key={comment.id}/> 
                        )})}
                        </TableBody>
                </Table>
            </TableContainer>
        </>
    )
    
}