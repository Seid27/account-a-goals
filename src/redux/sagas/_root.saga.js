import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import goalsSaga from './goals.saga';
import actionPlansSaga from './actionPlans.saga';
import reflectionsSaga from './reflections.saga';
import commentSaga from './comments.saga';
import accountaFriendsSaga from './accounta_friends.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    goalsSaga(),
    actionPlansSaga(),
    reflectionsSaga(),
    commentSaga(),
    accountaFriendsSaga()
  ]);
}
