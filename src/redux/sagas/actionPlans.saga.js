import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// actionPlan saga
// gets action plan data
// deletes action plan
// adds new action plan
// edit action plan
function* fetchActionPlans () {
    try {
        console.log('fetching data');
        const result = yield axios.get('/api/actionplans');
        console.log(result);
        yield put({type: 'SET_ACTION_PLAN', payload: result.data})
        
    } catch (error) {
        console.error(error);
    }
}

function* addActionPlan(action){
    try {
        yield axios.post('api/actionplans', action.payload);
        yield put({type: 'FETCH_ACTION_PLANS'});
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
    yield takeLatest('ADD_ACTION_PLANS',addActionPlan);
    yield takeLatest('REMOVE_ACTION_PLANS',fetchActionPlans);
    yield takeLatest('EDIT_ACTION_PLANS',fetchActionPlans);
}

export default actionPlansSaga;