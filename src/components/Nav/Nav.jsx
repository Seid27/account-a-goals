import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      
      <Link to="/home">
        <Box sx={{display: 'flex', alignItems: 'center'}}>
        <img src="/images/dart_32.png"/>
        <h2 className="nav-title">Account-a-Goals</h2>
        </Box>
        
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Goals
            </Link>

            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <Link className='navLink' to='/accountafriends'>
              Account-a-Friends
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
