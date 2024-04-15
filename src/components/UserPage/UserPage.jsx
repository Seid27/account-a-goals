import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import Search from '../Search/Search';
import Goals from '../Goals/Goals';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div>
      {/* <h1>Welcome, {user.username}!</h1> */}
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <Goals name={user.username}/>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
