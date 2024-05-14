import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// adds new action plan
// action.payload contains user an object {title: '', description: '', id: goal_id}
function* addActionPlan(action){
    try {
        yield axios.post('api/actionplans', action.payload);
        // to refresh goal detail page
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.id});
    } catch (error) {
        console.error(error);
    }

}

// edit action plan
// payload contains the action plan id and goal id
function* editActionPlan(action){
    try {
        yield axios.put(`/api/actionplans/${action.payload.id}`, action.payload);
        // to refresh goal detail page
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
    } catch (error) {
        console.error(error);
    }
}

// deletes action plan
// action.payload contains the id of the action plan to delete
function* removeActionPlan(action){
    console.log(action);
    try {
        yield axios.delete(`api/actionplans/${action.payload.id}`);
        // to refresh goal detail page
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
    } catch (error) {
        console.error(error);
    }

}

// actionPlan saga
function* actionPlansSaga(){
    yield takeLatest('ADD_ACTION_PLAN',addActionPlan);
    yield takeLatest('REMOVE_ACTION_PLANS',removeActionPlan);
    yield takeLatest('EDIT_ACTION_PLAN',editActionPlan);
}

export default actionPlansSaga;