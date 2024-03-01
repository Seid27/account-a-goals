 function accountaFriends(state=[], action) {
    if (action.type == 'SET_ACCOUNTA_FRIENDS') {
        return action.payload;
    }
    return state;
}

function accountaFriendsGoals(state=[], action){
    if (action.type == 'SET_ACCOUNTA_FRIENDS_GOALS'){
        return action.payload;
    }
    return state
}

export {accountaFriends, accountaFriendsGoals};