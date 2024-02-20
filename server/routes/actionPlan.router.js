const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for action_plan
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `select action_plan.action_plan_title, 
                            action_plan.action_plan_desc,
                            action_plan.status, 
                            action_plan.target_date, 
                            action_plan.date_created from action_plan 
                            join goal on goal.id=action_plan.goal_id where user_id=${req.user.id}`;
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
    res.sendStatus(error);
  })
});

/**
 * POST route for action_plan
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;