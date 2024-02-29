function accountaFriends(state=[], action) {
    if (action.type == 'SET_ACCOUNTA_FRIENDS') {
        return action.payload;
    }
    return state;
}

export default accountaFriends;