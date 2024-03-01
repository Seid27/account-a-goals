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
 * GET accountaFriends friend's goals a user is accountable for
 */
router.get('/goals/:accountaFriend_id', (req, res) => {
    // GET route code here
    const queryText = `select goal.id, 
                              goal.goal_title, 
                              goal.accounta_friend_id, 
                              goal.goal_desc, 
                              goal.status, 
                              goal.date_created, 
                              goal.date_modified, 
                              goal.target_date from "user"
                              join "goal" on "user".id = goal.user_id 
                              where goal.accounta_friend_id = ${req.user.id} and "user".id = ${req.params.accountaFriend_id};`;
    pool.query(queryText).then((result)=>{
      res.send(result.rows);
    }).catch((error)=>{
      console.error(error);
    });
  });

  /**
 * GET action_plan for an accountaFriend
 */
router.get('/actionplans/:goal_id', (req,res)=>{
    const queryText = `select action_plan.id, 
    action_plan.action_plan_title, 
    action_plan.action_plan_desc, 
    action_plan.target_date, 
    action_plan.date_created, 
    action_plan.date_modified, 
    action_plan.status, 
    action_plan.goal_id from action_plan where action_plan.goal_id = ${req.params.goal_id}`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    });
});


 /**
 * GET reflection for an accountaFriend
 */
router.get('/reflections/:goal_id',(req,res)=>{
    // const queryText = `select reflection.id, 
    //                     reflection.reflection_title, 
    //                     reflection.reflection_desc, 
    //                     reflection.date_created, 
    //                     reflection.date_modified from reflection 
    //                     join goal on goal.id = reflection.goal_id where goal.id = ${req.params.goal_id}`;

    const queryText = `select reflection.id, 
                        reflection.reflection_title, 
                        reflection.reflection_desc, 
                        reflection.date_created, 
                        reflection.date_modified, 
                        reflection.goal_id from reflection where reflection.goal_id = ${req.params.goal_id};`
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    })
});

module.exports = router;