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
        yield put({type:'SET_ACCOUNTA_FRIENDS_REFLECTIONS', payload: result.data});
        const result = yield axios.get(`/api/accountafriends/reflections/${action.payload}`);
        console.log("friends reflections",result);
    } catch (error) {
        
    }
}

function* accountaFriendsSaga() {
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS',fetchAccountaFriends);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_GOALS',fetchAccountaFriendGoals);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_ACTION_PLANS',fetchAccountaFriendActionPlans);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_REFLECTIONS',fetchReflections);

    
}

export default accountaFriendsSaga;