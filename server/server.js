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
const reflectionRouter = require('./routes/reflection.router');
const actionPlansRouter = require('./routes/actionPlans.router');
const commentRouter = require('./routes/comment.router');
const accounta_buddyRouter = require('./routes/accounta_buddy.router');

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
app.use('/api/reflection',reflectionRouter);
app.use('/api/actionplans',actionPlansRouter);
app.use('/api/comment',commentRouter);
app.use('/api/accountabuddy', accounta_buddyRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
