import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Goals from '../Goals/Goals';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const goals = useSelector(s=>s.goals);
  const dispatch = useDispatch();

  //fetch all data for a user
  function fetchGoals() {
      dispatch({
          type: 'FETCH_GOALS_BY_USERNAME',
          payload: user.username
      });
  }

  useEffect(()=>{
      fetchGoals();
  },[]);

  return (
    <div>
      {/* <h1>Welcome, {user.username}!</h1> */}
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <Goals goals={goals} />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
