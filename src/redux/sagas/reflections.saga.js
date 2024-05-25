import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// add new reflection
// action.payload contains user an object {title: '', description: '', id: goal_id}
function* addReflection(action) {
    try {
        yield axios.post('api/reflections', action.payload);
        // to refresh goal detail page
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.id});
    } catch (error) {
        console.error(error);
    }
    
}

function* editReflection(action) {
    try {
        yield axios.put(`/api/reflections/${action.payload.id}`, action.payload);
        // to refresh goal detail page
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
    } catch (error) {
        console.error(error);
    }
    
}

function* removeReflection(action){
    try {
        yield axios.delete(`/api/reflections/${action.payload.id}`);
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
    } catch (error) {
        console.error(error);
    }
}


function* reflectionsSaga(){
    yield takeLatest('ADD_REFLECTION', addReflection);
    yield takeLatest('EDIT_REFLECTION', editReflection);
    yield takeLatest('REMOVE_REFLECTION',removeReflection);
}

export default reflectionsSaga;
