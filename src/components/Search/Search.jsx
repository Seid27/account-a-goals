import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import axios from 'axios';

export default function Search() {
    const [searchUser, setSearchUser] = useState([]);

    function sendSearchQuery(value) {
        console.log(value);
        //todo: this should be in saga
        axios.get(`/api/user/search/${value}`).then((res)=>{
            console.log(res.data);
            // let result = res.data.map(user => user.full_name);
            setSearchUser(res.data);
        }).catch((error)=>{
            console.error(error);
        });
        
    }
    return(<>
        <Autocomplete
            sx={{mt:'10px'}}
            disablePortal
            id="combo-box-demo"
            options={searchUser}
            getOptionLabel={(option) => option.full_name}
            renderOption={(props, option) => (
                
                <Box component="li" sx={{ '& > img': { ml: 10, flexShrink: 0 } }} {...props}>
                    <Avatar  sx={{ mr: 2, flexShrink: 0 } } src="/broken-image.jpg"/>
                 {/* <Avatar sx={{ mr: 2, flexShrink: 0 } } alt="Remy Sharp" 
                 src="https://images.pexels.com/photos/3574678/pexels-photo-3574678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
                  {option.full_name}
                  
                </Box>

              )}
            renderInput={(params) => 
                
            <TextField required onChange={(e)=>{sendSearchQuery(e.target.value)}} {...params} id="accounta_friend_name"
            name="accounta_friend_name" label="Account-a-Friend" />}
        />
    </>)
    
}