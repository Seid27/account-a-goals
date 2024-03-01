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

function* accountaFriendsSaga() {
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS',fetchAccountaFriends);
    yield takeLatest('FETCH_ACCOUNTA_FRIENDS_GOALS',fetchAccountaFriendGoals);
    
}

export default accountaFriendsSaga;