import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// gets action plan data
function* fetchActionPlans (action) {
    try {
        console.log(action.payload);
        const result = yield axios.get(`/api/actionplans/`);
        console.log(result);
        yield put({type: 'SET_ACTION_PLAN', payload: result.data})
        
    } catch (error) {
        console.error(error);
    }
}


// adds new action plan
function* addActionPlan(action){
    console.log(action.payload);
    try {
        yield axios.post('api/actionplans', action.payload);
        yield put({type: 'FETCH_ACTION_PLANS'}); 
    } catch (error) {
        console.error(error);
    }

}

// deletes action plan
function* removeActionPlan(action){
    try {
        yield axios.delete(`api/actionplans/${action.payload}`);
        yield put({type: 'FETCH_ACTION_PLANS'}); 
    } catch (error) {
        console.error(error);
    }

}

// edit action plan
function* editActionPlan(action){
    try {
        yield axios.put(`/api/actionplans/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_ACTION_PLANS'});
    } catch (error) {
        console.error(error);
    }
}

// actionPlan saga
function* actionPlansSaga(){
    yield takeLatest('FETCH_ACTION_PLANS',fetchActionPlans);
    yield takeLatest('ADD_ACTION_PLAN',addActionPlan);
    yield takeLatest('REMOVE_ACTION_PLANS',removeActionPlan);
    yield takeLatest('EDIT_ACTION_PLAN',editActionPlan);
}

export default actionPlansSaga;