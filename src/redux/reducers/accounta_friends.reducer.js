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

function accountaFriendsActionPlans(state=[], action){
    if (action.type == 'SET_ACCOUNTA_FRIENDS_ACTIONS_PLANS'){
        return action.payload;
    }
    return state
}

function accountaFriendsReflections(state=[], action){
    if (action.type == 'SET_ACCOUNTA_FRIENDS_REFLECTIONS'){
        return action.payload;
    }
    return state
}



export {accountaFriends, accountaFriendsGoals, accountaFriendsReflections, accountaFriendsActionPlans};