import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


function* fetchAccountaFriends(){
    try {
        const result = yield axios.get('/api/accountafriends');
        yield put({type:'SET_ACCOUNTA_FRIENDS', payload: result.data});
    } catch (error) {
        console.error(error);
    }
}

// action.payload contains accountafriend id
function* fetchAccountaFriendGoals(action){
    try {
        const result = yield axios.get(`/api/accountafriends/goals/${action.payload}`);
        console.log('account friends goals',result.data);
        yield put({type: 'SET_ACCOUNTA_FRIENDS_GOALS', payload: result.data});
    } catch (error) {
        console.error(error);
    }
}

function* fetchAccountaFriendActionPlans(action) {
    try {
        const result = yield axios.get(`/api/accountafriends/actionplans/${action.payload}`);
        yield put({type:'SET_ACCOUNTA_FRIENDS_ACTIONS_PLANS', payload: result.data});
        console.log("friends actions", result);
    } catch (error) {
        console.error(error);
        
    }
}

function* fetchReflections(action){
    try {
        const result = yield axios.get(`/api/accountafriends/reflections/${action.payload}`);
        yield put({type:'SET_ACCOUNTA_FRIENDS_REFLECTIONS', payload: result.data});
        console.log("friends reflections",result);
    } catch (error) {
        
    }
}

function* fetchAccountaComments(action){
    try {
        console.log("action",action.payload);
        const result = yield axios.get(`/api/accountafriends/comments/${action.payload}`);
        yield put({type:'SET_ACCOUNTA_FRIENDS_COMMENTS', payload: result.data});
        console.log("result of comments accounta friend",result.data);
    } catch (error) {
        console.error(error);
    }
}

function* editAccoutaFriendComment(action){
    try {
        yield axios.put(`/api/comments/${action.payload.id}`,action.payload);
        yield put({type: 'FETCH_ACCOUNTA_FRIENDS_COMMENTS', payload: action.payload.goal_id });
    } catch (error) {
        console.log(error);
    }
}

function* addAccoutaFriendComment(action){
    try {
        yield axios.post('/api/comments', action.payload);
        yield put({type: 'FETCH_ACCOUNTA_FRIENDS_COMMENTS', payload: action.payload.goal_id });
    } catch (error) {
        console.error(error);
    }
}


function* removeAccoutaFriendComment(action){
    try {
        yield axios.delete(`/api/comments/${action.payload.id}`);
        yield put({type: 'FETCH_ACCOUNTA_FRIENDS_COMMENTS', payload: action.payload.goal_id });
    } catch (error) {
        console.error(error);
    }
}



function* accountaFriendsSaga() {
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS',fetchAccountaFriends);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_GOALS',fetchAccountaFriendGoals);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_ACTION_PLANS',fetchAccountaFriendActionPlans);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_REFLECTIONS',fetchReflections);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_COMMENTS', fetchAccountaComments);
    yield takeLatest('EDIT_ACCOUNTA_FRIEND_COMMENT', editAccoutaFriendComment);
    yield takeLatest('ADD_ACCOUNTA_FRIEND_COMMENT', addAccoutaFriendComment);
    yield takeLatest('REMOVE_ACCOUNTA_FRIEND_COMMENT', removeAccoutaFriendComment);
}

export default accountaFriendsSaga;