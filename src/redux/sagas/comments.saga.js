import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchComments() {
    try {
        
    } catch (error) {
        
    }
    
}


function* addComment(){
    try {
        
    } catch (error) {
        
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