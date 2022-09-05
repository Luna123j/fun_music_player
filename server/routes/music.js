const express = require('express');
const router = express.Router();
const request = require("request")


router.get('/', (req, res, next) => {
  res.send({result:"Ok"});
});

router.post('/', (req, res, next) => {  
  const title = req.body.title;
  request({
    url: `https://api.deezer.com/search/track?q=${title}`,
    method: 'GET',
  },
    (error, response, body) => {
      if (error) {
        console.log(error)
      } else {
        res.send(body)
      }
    })

});

module.exports = router;