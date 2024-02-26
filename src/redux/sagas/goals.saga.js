import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchGoals() {

    try {
        const result = yield axios.get('/api/goals');
        yield put({type: 'SET_GOALS', payload: result.data});
    } catch (error) {
        console.log(error);
    }
    
}

function* editGoalSaga(action){
    // console.log(action.payload.id);
    // console.log(action.payload);
    try {
        yield axios.put(`/api/goals/${action.payload.id}`, action.payload);
        yield put('FETCH_GOALS');
    } catch (error) {
        
    }
}

function* addGoalSaga(action){
    try {
        yield axios.post('/api/goals', action.payload);
        yield put('FETCH_GOALS', fetchGoals);
    } catch (error) {
        console.error(error);
    }
}

function* removeGoalSaga(action) {
    // console.log('remove goal', `/api/goals/${action.payload}`);
    try {
        yield axios.delete(`/api/goals/${action.payload}`);
        yield put ('FETCH_GOALS', fetchGoals);
    } catch (error) {
        console.error(error);
    }
    
}

function* goalsSaga() {
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('ADD_GOAL', addGoalSaga);
    yield takeLatest('EDIT_GOAL', editGoalSaga);
    yield takeLatest('REMOVE_GOAL', removeGoalSaga);
}


export default goalsSaga;