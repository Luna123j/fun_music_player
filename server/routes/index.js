
const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

const getUsernameLookUp = (username) => {
  const queryText = `Select * from users where user = $1`;
  const params = [username];
  db.query(queryText, params).then(data => {
    if (data.rows.length < 1) {
      return null;
    }
    return data.rows;
  });
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.status(200).send("ok");
});

router.post('/login',(req, res) => {
  // console.log(req.body);
});

router.get('/signup', (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    res.status(400).end();
  }
  res.status(200).end();
 
});

router.post('/signup', (req,res) => {
  if (req.body.username === "" || req.body.password === "") {
    res.status(400).end();
  }
  if (!getUsernameLookUp(req.body.username)) {
    console.log("ok");
    res.json({error: "User exist"});
  }
   

  
 
  
});

module.exports = router;
