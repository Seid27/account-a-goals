const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// /**
//  * GET route to get goals for a specific user using user id
//  */
router.get('/:user_id', rejectUnauthenticated,(req, res) => {
  // GET route code here
  // const queryText = `select * from "goal" where "user_id"=${req.user.id}`;
  console.log('get goals using user id');
  const queryText = `select goal.id, 
  goal.goal_title, goal.goal_desc, goal.user_id, goal.date_created, goal.date_modified, 
  goal.target_date, goal.status, goal.accounta_friend_id, (select concat( f_name, ' ', l_name) 
  from "user" where "user".id = goal.accounta_friend_id) as accounta_friend_name from goal where goal.user_id=${req.params.user_id};`
  pool.query(queryText).then((result)=>{
    res.send(result.rows);
  }).catch((error)=>{
    console.error(error);
    res.sendStatus(500);
  })
});

/**
 * GET route: get goal detail using goal id
 */
router.get('/detail/:goal_id', rejectUnauthenticated, (req,res)=>{
  console.log('get goals using goal id');
  console.log(req.params.goal_id);
  const queryText = 
  `select goal.id, goal.goal_title, goal.accounta_friend_id, goal.goal_desc, goal.status, goal.date_created, goal.date_modified, goal.target_date, 
  COALESCE (json_agg(DISTINCT jsonb_build_object(
              'id', action_plan.id,
              'title', action_plan.action_plan_title,
              'description', action_plan.action_plan_desc,
              'status', action_plan.status,
              'date_created', action_plan.date_created,
              'date_modified',action_plan.date_modified,
              'target_date', action_plan.target_date,
              'goal_id', action_plan.goal_id
              )) FILTER (WHERE action_plan.id IS NOT NULL), '[]') action_plans,
  COALESCE (json_agg(DISTINCT jsonb_build_object(
              'id', reflection.id,
              'title', reflection.reflection_title,
              'description', reflection.reflection_desc,
              'date_created', reflection.date_created,
              'date_modified',reflection.date_modified,
              'goal_id', reflection.goal_id
              )) FILTER (WHERE reflection.id IS NOT NULL), '[]') reflections,
  COALESCE (json_agg(DISTINCT jsonb_build_object(
              'id', comment.id,
              'title', comment.comment_title,
              'description', comment.comment_desc,
              'date_created', comment.date_created,
              'date_modified',comment.date_modified,
              'goal_id', comment.goal_id
              )) FILTER (WHERE comment.id IS NOT NULL), '[]') comments					
  from goal
  full outer join action_plan on action_plan.goal_id = goal.id
  full outer join reflection on reflection.goal_id = goal.id
  full outer join comment on comment.goal_id = goal.id
  where goal.id = ${req.params.goal_id}
  group by goal.id;`;
  pool.query(queryText)
  .then((result)=>{
    console.log(result.rows);
    res.send(result.rows);
  }).catch((err)=>{
    console.error(err);
  });
})

/**
 * POST route to create a new goal
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('receiving data');
  console.log(req.body.account_a_friend);
  const fullName = req.body.account_a_friend.split(" ");
  console.log(fullName);
  const getIdQuery = `select id from "user" where "f_name"='${fullName[0]}' and "l_name"='${fullName[1]}'`;
  pool.query(getIdQuery).then((result)=>{
    console.log(result.rows[0].id);
    const queryText = `insert into "goal" ("goal_title","goal_desc","user_id","accounta_friend_id","target_date")
    values($1, $2, ${req.user.id}, $3, $4)`;
    pool.query(queryText, [req.body.title, 
                              req.body.description, 
                              result.rows[0].id, 
                              req.body.targetDate])
      .then(()=>{
          res.sendStatus(201);
      }).catch((error)=>{
          console.error(error);
          res.sendStatus(500);
      })
  }).catch((error)=>{
    console.error(error);
    res.sendStatus(500);
  })
  // if (getIdQuery.rows) {
  //   const queryText = `insert into "goal" ("goal_title","goal_desc","user_id","accounta_friend_id","target_date")
  //   values($1, $2, ${req.user.id}, $3, $4)`;
  //   pool.query(queryText, [req.body.goal_title, 
  //                             req.body.goal_desc, 
  //                             getIdQuery.data, 
  //                             req.body.target_date])
  //     .then(()=>{
  //         res.sendStatus(201);
  //     }).catch((error)=>{
  //         console.error(error);
  //         res.sendStatus(500);
  //     })
  // }

  
});

/**
 * PUT route to edit goal
 */
router.put('/:goalId', rejectUnauthenticated,(req,res)=>{
  console.log('updating goal');
  console.log(req.body);
    const queryText = `UPDATE "goal"
    SET goal_title= $1, goal_desc= $2, target_date=$3, status=$4, date_modified=NOW() where id=${req.params.goalId}`;
    pool.query(queryText,[req.body.title, req.body.description, req.body.targetDate, req.body.status])
    .then(()=>{
        // const fullNameQuery =  `select "user".f_name, "user".l_name from goal join "user" on "user".id = goal.user_id where goal.id=${req.params.goalId}`;
        // pool.query(fullNameQuery).then((result)=>{
        //   console.log(result.rows);
        //   if (req.body.status === 'Complete') {
        //     console.log('sending complete message');
        //     client.messages
        //     .create({
        //         body: `Congratulate your Account-a-friend, 
        //         ${result.rows[0].f_name} ${result.rows[0].l_name}. ${req.body.goal_title} goal is complete.`,
        //         from: '+18554640563',
        //         to: '+12069607616'
        //     })
        //     .then(message => console.log(message.sid));
        //     }
        //   }).catch((error)=>{
        //     console.error(error);
        // })
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })

});

/**
 * DELETE route to delete goal
 */
router.delete('/:id', rejectUnauthenticated, (req,res)=>{
  console.log('deleting data ...');
  console.log(req.params.id);
    const queryText = `delete from goal where id=${req.params.id}`;
    pool.query(queryText).then(()=>{
        res.sendStatus(204);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});


module.exports = router;