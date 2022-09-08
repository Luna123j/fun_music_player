const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');
const db = require("../configs/db.config");





/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

router.get('/favourite',(req, res)=>{
  return res.status(200).send("ok");
})

router.post('/favourite',(req,res)=>{
  const { username } = req.body;
  return db.query(`select * from users where username = $1`, [username]).then(data=> {
    const user_id = data.rows[0].id;
    return db.query('Select * from favourites where user_id = $1', [user_id]).then(data => {
      if (data.rows.length === 0){
        res.send({error: "No favourite record"})
      } else {
        res.send(data.rows)
      }
    })
    
  })
})

module.exports = router;

