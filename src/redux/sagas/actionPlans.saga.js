import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// actionPlan saga
// gets action plan data
// deletes action plan
// adds new action plan
// edit action plan
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

function* addActionPlan(action){
    console.log(action.payload);
    try {
        yield axios.post('api/actionplans', action.payload);
        yield put({type: 'FETCH_ACTION_PLANS'}); //fixes this
    } catch (error) {
        console.error(error);
    }

}

function* removeActionPlan(){

}

function* editActionPlan(action){
    // try {
    //     axios.put(`/api/actionplan/${}`,{})
    // } catch (error) {
        
    // }
}

function* actionPlansSaga(){
    yield takeLatest('FETCH_ACTION_PLANS',fetchActionPlans);
    yield takeLatest('ADD_ACTION_PLAN',addActionPlan);
    yield takeLatest('REMOVE_ACTION_PLANS',fetchActionPlans);
    yield takeLatest('EDIT_ACTION_PLANS',fetchActionPlans);
}

export default actionPlansSaga;