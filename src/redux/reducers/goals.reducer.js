function goals(state =[], action) {
    if (action.type === 'SET_GOALS') {
        return action.payload;
    }

    return state;
    
}

function goalDetail(state=[], action) {
    if (action.type === 'SET_GOAL_DETAIL'){
        return action.payload
    }
    return state;
    
}
export {goals, goalDetail};