function goals(state =[], action) {
    if (action.type === 'SET_GOALS') {
        return action.payload;
    }

    return state;
    
}

export default goals;