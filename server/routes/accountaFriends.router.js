const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET accounta_buddy friends a user is accountable for
 */
router.get('/', rejectUnauthenticated,(req, res) => {
  // GET route code here
  const queryText = `select "user".id,
                    "user".f_name, 
                    "user".l_name from "user" 
                    join "goal" on "user".id = goal.user_id 
                    where goal.accounta_friend_id = ${req.user.id} group by "user".id;`;
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
  });
});

/**
 * GET accountaFriends friend's goals a user is accountable for
 */
router.get('/goals/:accountaFriend_id', rejectUnauthenticated, (req, res) => {

    const queryText = `select goal.id, 
    goal.goal_title, goal.goal_desc, goal.user_id, goal.date_created, goal.date_modified, 
    goal.target_date, goal.status, goal.accounta_friend_id, (select concat( f_name, ' ', l_name) 
    from "user" where "user".id = goal.accounta_friend_id) as accounta_friend_name from "user" join "goal" on "user".id = goal.user_id where goal.accounta_friend_id =  ${req.user.id}
    and "user".id = ${req.params.accountaFriend_id};`
    // GET route code here
    // const queryText = `select goal.id, 
    //                           goal.goal_title, 
    //                           goal.accounta_friend_id, 
    //                           goal.goal_desc, 
    //                           goal.status, 
    //                           goal.date_created, 
    //                           goal.date_modified, 
    //                           goal.target_date from "user"
    //                           join "goal" on "user".id = goal.user_id 
    //                           where goal.accounta_friend_id = ${req.user.id} and "user".id = ${req.params.accountaFriend_id}`;
    pool.query(queryText).then((result)=>{
      res.send(result.rows);
    }).catch((error)=>{
      console.error(error);
    });
  });

  /**
 * GET action_plan for an accountaFriend
 */
router.get('/actionplans/:goal_id', rejectUnauthenticated,(req,res)=>{
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
router.get('/reflections/:goal_id', rejectUnauthenticated,(req,res)=>{
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
                        reflection.goal_id from reflection where reflection.goal_id = ${req.params.goal_id}`
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    })
});

/**
 * GET comment for an accountaFriend
 */
router.get('/comments/:goal_id', rejectUnauthenticated,(req,res)=>{


  const queryText = `select comment.id, 
                            comment.comment_title, 
                            comment.comment_desc, 
                            comment.date_created, 
                            comment.date_modified, 
                            comment.goal_id from comment where comment.goal_id = ${req.params.goal_id}`
  pool.query(queryText).then((result)=>{
      res.send(result.rows);
  }).catch((error)=>{
      console.error(error);
  })
});

module.exports = router;