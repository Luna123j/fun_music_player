const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');


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
  const songDetails = req.body.currentSong;
  const username = req.body.username;


})

module.exports = router;

