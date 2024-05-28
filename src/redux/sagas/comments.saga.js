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

// adds new comment
// action.payload contains user an object {title: '', description: '', id: goal_id}
function* addComment(action){
    console.log(action.payload);
    try {
        yield axios.post('/api/comments', action.payload);
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.id});
    } catch (error) {
        console.error(error);
    }
}


// edit comment
// action.payload contains user an object {id: comment_id, goal_id: goal_id, title: '', description: ''}
function* editComment(action){
    try {
        yield axios.put(`/api/comments/${action.payload.id}`,action.payload);
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
    } catch (error) {
        console.log(error);
    }
}

// deletes comment
// action.payload contains the id of the comment to delete
function* removeComment(action){
    try {
        yield axios.delete(`/api/comments/${action.payload.id}`);
        yield put({type: 'FETCH_GOAL_DETAIL', payload: action.payload.goal_id});
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