const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for comment
 */
router.get('/', (req, res) => {
    // GET route code here
    const queryText = `select "comment".id,
                                "comment".comment_title, 
                                "comment".comment_desc, 
                                "comment".date_created from "comment" 
                                join goal on goal.id = "comment".goal_id where user_id = ${req.user.id}`;

    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
    });
});

/**
 * POST route to create a new comment
 */
router.post('/', (req, res) => {
    const queryText = `insert into "comment" ("comment_title", "comment_desc", "goal_id")
    values ($1,$2,$3)`;
    pool.query(queryText,[req.body.comment_title,
                            req.body.comment_desc,
                            req.body.goal_id])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
    })
});

/**
 * PUT route to edit a comment
 */
router.put('/:comment_id',(req,res)=>{
    const queryText = `update "comment" set comment_title=$1, comment_desc=$2, date_modified=NOW() where id=${req.params.comment_id}`;
    pool.query(queryText,[req.body.comment_title, req.body.comment_desc]).then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
    })
})

/**
 * DELETE route to edit goal
 */
router.delete('/:comment_id', (req,res)=>{
    const queryText = `delete from comment where id=${req.params.comment_id}`;
    pool.query(queryText).then(()=>{
        res.sendStatus(204);
    }).catch((error)=>{
        console.error(error);
    })
});

module.exports = router;
