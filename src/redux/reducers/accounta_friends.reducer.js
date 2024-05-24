 // stores all accounta friends for a user
 function accountaFriends(state=[], action) {
    if (action.type === 'SET_ACCOUNTA_FRIENDS') {
        return action.payload;
    }
    return state;
}

// stores goal detail for a specific accounta friend for a user
function accountaFriendsGoals(state=[], action){
    if (action.type === 'SET_ACCOUNTA_FRIENDS_GOALS'){
        return action.payload;
    }
    return state;
}



export {accountaFriends, accountaFriendsGoals};