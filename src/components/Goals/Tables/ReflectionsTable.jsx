import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, Typography } from "@mui/material";
import AddReflectionDialog from "../Dialogs/AddReflectionDialog"
import EditReflectionDialog from "../Dialogs/EditReflectionDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import dayjs from "dayjs";

export default function reflectionsTable({goal_id, reflections}) {
    const dispatch = useDispatch();
    // const reflections = useSelector(s=>s.reflections.filter((reflection)=>reflection.goal_id==goal_id));
    const goal = useSelector(s=>s.accountaFriendsGoals.filter((goal)=> goal.id == goal_id));
    const user = useSelector((store) => store.user);
    // const reflections = useSelector((s)=>s);
    console.log("reflections data filter", reflections);

    // function fetchReflections() {
    //     dispatch({
    //         type: 'FETCH_REFLECTIONS'
    //     }); 
    // }

    // useState(()=>{
    //     fetchReflections();
    // }, []);

    
    function Row({reflection}) {
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
                        {reflection.reflection_title}
                    </TableCell>
                    {/* Edit */}
                    {user.id != goal[0]?.accounta_friend_id &&
                    <TableCell >
                        <EditReflectionDialog 
                        reflection={reflection}/>
                    </TableCell>
                    }
                    
                    {/* Delete */}
                    {user.id != goal[0]?.accounta_friend_id &&
                    <TableCell>
                        
                        <DeleteDialog action={'REMOVE_REFLECTION'} id={reflection.id} title={reflection.reflection_title}/>
                        
                    </TableCell>
                    }

                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6">
                                    {reflection.reflection_desc}
                                    </Typography> 
                                    <Typography>
                                    Date Created: {dayjs(reflection.date_created).format('MM/DD/YYYY')}
                                    </Typography>
                                    <Typography>
                                    Target Date: {dayjs(reflection.date_modified).format('MM/DD/YYYY')}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
        </>) 
    }

    return (
        <>
            {/* {user.id ===  goal.accounta_friend_id && <AddActionPlanDialog goal_id={goal_id}/>} */}
            {/* {user.id != goal[0]?.accounta_friend_id &&<AddReflectionDialog goal_id={goal_id}/>} */}
            <Box sx={{mt:'30px'}}>
                <TableContainer component={Paper}>
                    {user.id != goal[0]?.accounta_friend_id &&<AddReflectionDialog goal_id={goal_id}/>}
                    <Box>
                        <Typography
                            sx={{ flex: '1 1 100%', p:'20px' }}
                            variant="h4"
                            id="tableTitle"
                        >
                            Reflections
                        </Typography>
                    </Box>

                    {reflections.length===0? <Box sx={{display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='/images/noData.jpg' alt="" />
                </Box>:
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell/>
                                <TableCell>Reflection</TableCell>
                                {user.id != goal[0]?.accounta_friend_id && 
                                <TableCell>Edit</TableCell>}
                                {user.id != goal[0]?.accounta_friend_id && 
                                <TableCell>Delete</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reflections.map((reflection)=>{
                                return (
                                    <Row reflection={reflection} key={reflection.id}/> 
                            )})}
                            </TableBody>
                    </Table>}
                </TableContainer>

            </Box>
            
        </>
    )
    
}