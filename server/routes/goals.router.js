const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route to get goals for a specific user
 */
router.get('/', rejectUnauthenticated,(req, res) => {
  // GET route code here
  const queryText = `select * from "goal" where "user_id"=${req.user.id}`;
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
    res.sendStatus(500);
  })
});

/**
 * POST route to create a new goal
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('receiving data');
  console.log(req.body);
  const queryText = `insert into "goal" ("goal_title","goal_desc","user_id","accounta_friend_id","target_date")
  values($1, $2, ${req.user.id}, $3, $4)`;
  pool.query(queryText, [req.body.goal_title, 
                            req.body.goal_desc, 
                            req.body.accounta_friend_id, 
                            req.body.target_date])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});

/**
 * PUT route to edit goal
 */
router.put('/:goalId',(req,res)=>{
  console.log('updating goal');
    const queryText = `UPDATE "goal"
    SET goal_title= $1, goal_desc= $2, target_date=$3, status=$4, date_modified=NOW() where id=${req.params.goalId}`;
    pool.query(queryText,[req.body.goal_title, req.body.goal_desc, req.body.target_date, req.body.status])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
    })

});

/**
 * DELETE route to delete goal
 */
router.delete('/:goalId', (req,res)=>{
  console.log('deleting data ...');
    const queryText = `delete from goal where id=${req.params.goalId}`;
    pool.query(queryText).then(()=>{
        res.sendStatus(204);
    }).catch((error)=>{
        console.error(error);
    })
});


module.exports = router;