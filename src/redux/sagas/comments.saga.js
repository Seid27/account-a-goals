import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchComments() {
    try {
        const result = yield axios.get('/api/comments');
        yield put({type: 'SET_COMMENTS', payload: result.data});
    } catch (error) {
        console.error(error);
    }
    
}


function* addComment(action){
    try {
        yield axios.post('/api/comments', action.payload);
        yield put({type: 'FETCH_COMMENTS'});
    } catch (error) {
        console.error(error);
    }
}

function* editComment(action){
    try {
        const result = yield axios.put(`/api/comments/${action.payload.id}`,action.payload);
        console.log(result);
        yield put({type: 'FETCH_COMMENTS'});
    } catch (error) {
        console.log(error);
    }
}

function* removeComment(){
    try {
        
    } catch (error) {
        
    }
}

function* commentsSaga(){
    yield takeLatest('FETCH_COMMENTS',fetchComments);
    yield takeLatest('ADD_COMMENT', addComment);
    yield takeLatest('EDIT_COMMENT', editComment);
    yield takeLatest('REMOVE_COMMENT', removeComment);
}

export default commentsSaga;