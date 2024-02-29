const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET accounta_buddy friends a user is accountable for
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `select "user".id,
                    "user".f_name, 
                    "user".l_name from "user" 
                    join "goal" on "user".id = goal.user_id 
                    where goal.accounta_friend_id = ${req.user.id}`;
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
  });
});

/**
 * GET accounta_buddy friend's goals a user is accountable for
 */
router.get('/:accountaFriend_id', (req, res) => {
    // GET route code here
    const queryText = `select goal.id, 
                        goal.goal_title from "user" 
                        join "goal" on "user".id = goal.user_id 
                        where goal.accounta_buddy_id = ${req.user.id} and "user".id = ${req.params.accountaFriend_id};`;
    pool.query(queryText).then((result)=>{
      res.send(result.rows);
    }).catch((error)=>{
      console.error(error);
    });
  });

  /**
 * GET action_plan for an accounta_buddy 
 */
router.get('/actionplan/:goal_id', (req,res)=>{
    const queryText = `select  action_plan.action_plan_title, 
                        action_plan.action_plan_desc, 
                        action_plan.target_date, 
                        action_plan.date_created, 
                        action_plan.date_modified, 
                        action_plan.status from action_plan 
                        join goal on action_plan.goal_id = goal.id where goal.id = ${req.params.goal_id}`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    });
});


 /**
 * GET reflection for an accounta_buddy 
 */
router.get('/reflection/:goal_id',(req,res)=>{
    const queryText = `select reflection.id, 
                        reflection.reflection_title, 
                        reflection.reflection_desc, 
                        reflection.date_created, 
                        reflection.date_modified from reflection 
                        join goal on goal.id = reflection.goal_id where goal.id = ${req.params.goal_id}`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    })
});

module.exports = router;