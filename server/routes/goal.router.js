const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('receiving data');
  const queryText = `insert into "goal" ("goal_title","goal_desc","user_id","accounta_buddy_id","target_date","date_created")
  values($1, $2, ${req.user.id}, $3, $4 , $5)`;
  pool.query(queryText, [req.body.goal_title, 
                            req.body.goal_desc, 
                            req.body.accounta_buddy_id, 
                            req.body.target_date, 
                            req.body.date_created])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});

module.exports = router;