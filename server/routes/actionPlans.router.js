const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route for action_plan
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('getting action plans data ... ');
  // const queryText = `select action_plan.id,
  //                           action_plan.action_plan_title, 
  //                           action_plan.action_plan_desc,
  //                           action_plan.status, 
  //                           action_plan.target_date, 
  //                           action_plan.date_created from action_plan 
  //                           join goal on goal.id=action_plan.goal_id where "user_id"=${req.user.id} and "goal_id"=${req.params.goal_id}`;

  const queryText = `select action_plan.id, action_plan.action_plan_title, action_plan.action_plan_desc,action_plan.goal_id,
  action_plan.status, action_plan.target_date, action_plan.date_created from
  action_plan join goal on goal.id=action_plan.goal_id where user_id=${req.user.id} order by date_created desc`
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
    res.sendStatus(error);
  })
});

// /**
//  * GET route for action_plan by goal ID
//  */

// router.get(':goalId',(req,res)=>{
//   const queryText = ``;
//   try {
    
//   } catch (error) {
//     console.error(error);
//     res.send(500);
//   }
// })


/**
 * POST route for action_plan
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  // POST route code here
  const queryText = `insert into action_plan("action_plan_title", "action_plan_desc", "target_date", "status", "goal_id")
  values($1,$2,$3,$4,$5)`;

  pool.query(queryText,[
                        req.body.action_plan_title,
                        req.body.action_plan_desc,
                        req.body.target_date,
                        req.body.status,
                        req.body.goal_id]).then(()=>{
                          res.sendStatus(201);
                        }).catch((error)=>{
                          console.error(error);
                        })

  //status is optional field its default value is false
  // if (req.body.status){
  //   queryText = `insert into action_plan("action_plan_title", "action_plan_desc", "target_date","status", "goal_id")
  //   values($1,$2,$3,$4,$5)`;
  //   pool.query(queryText,[req.body.action_plan_title,
  //                       req.body.action_plan_desc,
  //                       req.body.target_date,
  //                       req.body.status,
  //                       req.body.goal_id])
  //   .then(()=>{
  //       res.sendStatus(201);
  //     }).catch((error)=>{
  //       console.error(error);
  //     })    
  // } else{
  //   pool.query(queryText,[req.body.action_plan_title,
  //                       req.body.action_plan_desc,
  //                       req.body.target_date,
  //                       req.body.goal_id])
  //   .then(()=>{
  //       res.sendStatus(201);
  //     }).catch((error)=>{
  //       console.error(error);
  //     });
  // }
});


/**
 * PUT route to edit action_plan
 */
router.put('/:action_plan_id', rejectUnauthenticated,(req,res)=>{
    const queryText = `UPDATE "action_plan"
    SET "action_plan_title"=$1, "action_plan_desc"=$2, "target_date"=$3, "status"=$4, date_modified=NOW() where id=${req.params.action_plan_id}`;
    pool.query(queryText,[req.body.action_plan_title, req.body.action_plan_desc, req.body.target_date, req.body.status]).then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
    })
});

/**
 * DELETE route to actionPlan 
 */
router.delete('/:action_plan_id', rejectUnauthenticated, (req,res)=>{
  console.log('delete action plan');
    const queryText = `delete from action_plan where id=${req.params.action_plan_id}`;
    pool.query(queryText).then(()=>{
        res.sendStatus(204);
    }).catch((error)=>{
        console.error(error);
    })
});

module.exports = router;