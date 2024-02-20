const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to get a reflection for a specific goal
 */
router.get('/', (req, res) => {
  // GET route code here
    const queryText = `select reflection.reflection_title, 
                            reflection.reflection_desc, 
                            reflection.date_created, 
                            reflection.comment from goal 
                            join reflection on reflection.goal_id = goal.id where user_id = 2`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    });
});

/**
 * POST route to create a new reflection for a specific goal
 */
router.post('/', (req, res) => {
  // POST route code here
  
});

module.exports = router;