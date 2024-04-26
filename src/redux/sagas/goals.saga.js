import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2'


// action.payload contains user id
function* fetchGoals(action) {

    try {
        const result = yield axios.get(`/api/goals/${action.payload}`);
        yield put({type: 'SET_GOALS', payload: result.data});
    } catch (error) {
        console.log(error);
    }
    
}

// action.payload contains goal id
function* fetchGoalDetail(action){
    try {
        const result = yield axios.get(`/api/goals/detail/${action.payload}`);
        yield put({type: 'SET_GOAL_DETAIL', payload: result.data});
    } catch (error) {
        console.error(error);
    }
}

// action.payload contains username
// function* fetchGoalsByUserName(action) {
//     try {
//         const result = yield axios.get(`/api/goals/${action.payload}`);
//         yield put({type: 'SET_GOALS', payload: result.data});
//     } catch (error) {
//         console.log(error);
//     }
// }

function* editGoalSaga(action){
    // console.log(action.payload.id);
    // console.log(action.payload);
    try {
        yield axios.put(`/api/goals/${action.payload.id}`, action.payload);
        yield put({type:'FETCH_GOALS'});
        Swal.fire({
            title: "Goal Updated!",
            icon: "success"
          });
    } catch (error) {
        console.log(error);
    }
}


// action.payload contains user an object {title: '', description: '', targetDate: '', status: '', id: user_id}
function* addGoalSaga(action){
    try {
        yield axios.post('/api/goals', action.payload);
        yield put({type:'FETCH_GOALS', payload: action.payload.id});
        Swal.fire({
            title: "Goal Added!",
            icon: "success"
          });
    } catch (error) {
        console.error(error);
    }
}

function* removeGoalSaga(action) {
    // console.log('remove goal', `/api/goals/${action.payload}`);
    try {
        yield axios.delete(`/api/goals/${action.payload}`);
        yield put({type:'FETCH_GOALS'});
    } catch (error) {
        console.error(error);
    }
    
}

function* goalsSaga() {
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('FETCH_GOAL_DETAIL', fetchGoalDetail);
    // yield takeLatest('FETCH_GOALS_BY_USERNAME', fetchGoalsByUserName);
    yield takeLatest('ADD_GOAL', addGoalSaga);
    yield takeLatest('EDIT_GOAL', editGoalSaga);
    yield takeLatest('REMOVE_GOAL', removeGoalSaga);
}


export default goalsSaga;