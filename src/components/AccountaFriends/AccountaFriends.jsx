import { Avatar, Card, CardActionArea, CardContent, CardMedia, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

export default function AccountaFriends() {
    const dispatch = useDispatch();
    const accountaFriends = useSelector(s=>s.accountaFriends);
    const history = useHistory();
    console.log(accountaFriends);
    function fetchAccountaFriends() {
        dispatch({
            type: 'FETCH_ACCOUNTA_FRIENDS'
        })
    }
    useEffect(()=>{
        fetchAccountaFriends();
    },[])

    function handleClick(id) {
        history.push({pathname: `/accounta-friends-goals/${id}`});
        
    }
    return (
        <>
            <h1>AccountaFriends</h1>
            <List>
                {accountaFriends.map((accountaFriend)=>{
                    return (
                        <ListItem key={accountaFriend.id} divider>
                            <ListItemButton onClick={()=>handleClick(accountaFriend.id)}>
                                <ListItemAvatar >
                                    <Avatar src="/broken-image.jpg"/>
                                </ListItemAvatar>
                                <ListItemText primary={
                                        <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">
                                        {accountaFriend.f_name + ' ' + accountaFriend.l_name}
                                    </Typography>}
                                />
                            </ListItemButton>    
                        </ListItem>
                )})}
            </List>
        </>
    )
    
}

{/* <Card sx={{m:'0px', p:'0px'}}>
                                <CardActionArea sx={{ display: 'flex'}}>
                                    <Avatar>H</Avatar>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {accountaFriend.f_name}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card> */}