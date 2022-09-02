const express = require('express');
const router = express.Router();

const users = ['Bob', 'Alex', 'Will', 'Tristan'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = router;