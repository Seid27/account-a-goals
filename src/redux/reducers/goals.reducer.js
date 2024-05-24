// stores all goals for a user
function goals(state =[], action) {
    if (action.type === 'SET_GOALS') {
        return action.payload;
    }
    return state;
}

//stores goal detail for a selected goal
function goalDetail(state=[], action) {
    if (action.type === 'SET_GOAL_DETAIL'){
        return action.payload
    }
    return state;
    
}
export {goals, goalDetail};