const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const goalsRouter = require('./routes/goals.router');
const reflectionsRouter = require('./routes/reflections.router');
const actionPlansRouter = require('./routes/actionPlans.router');
const commentsRouter = require('./routes/comments.router');
const accountaFriendsRouter = require('./routes/accountaFriends.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/goals',goalsRouter);
app.use('/api/reflections',reflectionsRouter);
app.use('/api/actionplans',actionPlansRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/accountafriends', accountaFriendsRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
