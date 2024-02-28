const { takeLatest, put } = require("redux-saga/effects");

function* fetchReflections(){
    try {
        const result = yield axios.get('/api/reflections/');
        yield put({type: 'SET_REFLECTIONS',payload: result.data});
    } catch (error) {
        console.error(error);
    }

}

function* addReflection(action) {
    try {
        yield axios.post(`/api/reflections/`, action.payload);
        yield put({type: 'FETCH_REFLECTIONS' });
    } catch (error) {
        console.error(error);
    }
    
}

function* editReflection(action) {
    try {
        yield axios.put(`/api/reflections/${action.payload.id}`, action.payload);
        yield put({type: 'FETCH_REFLECTIONS' });
    } catch (error) {
        console.error(error);
    }
    
}

function* removeReflection(action){
    try {
        yield axios.delete(`/api/reflections/${action.payload}`);
        yield put({type: 'FETCH_REFLECTIONS' });
    } catch (error) {
        console.error(error);
    }
}


function* reflectionsSaga(){
    yield takeLatest('FETCH_REFLECTIONS',fetchReflections);
    yield takeLatest('ADD_REFLECTION', addReflection);
    yield takeLatest('EDIT_REFLECTION', editReflection);
    yield takeLatest('REMOVE_REFLECTION',removeReflection);
}

export default reflectionsSaga;
