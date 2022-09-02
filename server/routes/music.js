const express = require('express');
const router = express.Router();
const request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
  request({
    url: `https://api.deezer.com/search/track?q=MyheartWillGoOn`,
    method: 'GET',
  },
    (error, response, body) => {
      if (error) {
        console.log(error)
      } else {
        res.send(body)
      }
  })
})



module.exports = router;