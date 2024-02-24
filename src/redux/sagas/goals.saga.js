import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGoals() {

    try {
        const result = yield axios.get('/api/goals');
        yield put({type: 'SET_GOALS', payload: result.data});
    } catch (error) {
        console.log(error);
    }
    
}

function* goalsSaga() {
    yield takeLatest('FETCH_GOALS', fetchGoals);
}


export default goalsSaga;