
import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import List from '@mui/material/List';
export default function Goals() {

    return (
        <>
            <div>Your Goals</div>
            <Button sx={{ml:'90%'}} variant='contained' >Add a Goal</Button>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    [{
                        "id": 11,
                        "goal_title": "visit Egypt",
                        "goal_desc": "I need to travel to see the pyramids",
                        "user_id": 4,
                        "accounta_buddy_id": 1,
                        "status": "Pending",
                        "target_date": "2024-05-22T05:00:00.000Z",
                        "date_created": "2024-12-31T06:00:00.000Z",
                        "date_modified": "2024-02-22T02:24:29.335Z"
                    }].map((goal, i) =>{
                    return (
                        <ListItem  key={i} secondaryAction={
                            <IconButton aria-label="delete" size="large">
                                <Delete fontSize='inherit'></Delete>
                            </IconButton>
                        }
                        disablePadding
                        >

                            <ListItemButton>
                                <ListItemIcon>
                                <Checkbox 
                                    edge="end"
                                    checked = {goal.status === 'Complete'}
                                    //todo: add check handler to send update to goal status using axios
                                />
                                </ListItemIcon>
                                <ListItemText primary={goal.goal_title}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })
                }              

            </List>
        </>
    )
    
}