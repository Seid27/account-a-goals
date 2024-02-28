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

function* editComment(){
    try {
        
    } catch (error) {
        
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