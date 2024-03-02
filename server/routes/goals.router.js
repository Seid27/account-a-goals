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
  // const queryText = `select * from "goal" where "user_id"=${req.user.id}`;
  const queryText = `select goal.id, 
  goal.goal_title, goal.goal_desc, goal.user_id, goal.date_created, goal.date_modified, 
  goal.target_date, goal.status, goal.accounta_friend_id, (select concat( f_name, ' ', l_name) 
  from "user" where "user".id = goal.accounta_friend_id) as accounta_friend_name from goal where goal.user_id=${req.user.id};`
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
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('receiving data');
  console.log(req.body.accounta_friend_name);
  const fullName = req.body.accounta_friend_name.split(" ");
  console.log(fullName);
  const getIdQuery = `select id from "user" where "f_name"='${fullName[0]}' and "l_name"='${fullName[1]}'`;
  pool.query(getIdQuery).then((result)=>{
    console.log(result.rows[0].id);
    const queryText = `insert into "goal" ("goal_title","goal_desc","user_id","accounta_friend_id","target_date")
    values($1, $2, ${req.user.id}, $3, $4)`;
    pool.query(queryText, [req.body.goal_title, 
                              req.body.goal_desc, 
                              result.rows[0].id, 
                              req.body.target_date])
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
    const queryText = `UPDATE "goal"
    SET goal_title= $1, goal_desc= $2, target_date=$3, status=$4, date_modified=NOW() where id=${req.params.goalId}`;
    pool.query(queryText,[req.body.goal_title, req.body.goal_desc, req.body.target_date, req.body.status])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })

});

/**
 * DELETE route to delete goal
 */
router.delete('/:goalId', rejectUnauthenticated, (req,res)=>{
  console.log('deleting data ...');
    const queryText = `delete from goal where id=${req.params.goalId}`;
    pool.query(queryText).then(()=>{
        res.sendStatus(204);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});


module.exports = router;