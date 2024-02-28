function reflections(state=[], action) {
    if (action.type === 'SET_REFLECTIONS') {
        return action.payload;
    }
    
    return state;
}

export default reflections;