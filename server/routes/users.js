const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = router;

