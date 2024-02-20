const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route to get a reflection for a specific goal
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
    const queryText = `select reflection.reflection_title, 
                            reflection.reflection_desc, 
                            reflection.date_created, 
                            reflection.comment from goal 
                            join reflection on reflection.goal_id = goal.id where user_id = ${req.user.id}`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    });
});

/**
 * POST route to create a new reflection for a specific goal
 */
router.post('/', (req, res) => {
  // POST route code here
  const queryText = `insert into reflection ("reflection_title", "reflection_desc", "date_created", "goal_id") values
  ($1,$2, $3, $4)`;
  pool.query(queryText,[req.body.reflection_title, 
                        req.body.reflection_desc, 
                        req.body.date_created, 
                        req.body.goal_id])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});

module.exports = router;