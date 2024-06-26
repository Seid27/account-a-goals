const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

/**
 * GET search for an account_a_buddy from registered users
 */
router.get('/search/:username', (req,res)=>{
  const queryText = `SELECT CONCAT (f_name, ' ', l_name) full_name FROM "user" 
                      WHERE username ILIKE '%${req.params.username}%' and "user".id != ${req.user.id}`;
  pool.query(queryText).then((result)=>{
      res.send(result.rows);
  }).catch((error)=>{
      console.error(error);
      res.sendStatus(500);
  })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (f_name, l_name, username, password)
    VALUES ($1, $2,$3,$4) RETURNING id`;
  pool
    .query(queryText, [f_name, l_name, username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;