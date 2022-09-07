const express = require('express');
const router = express.Router();
const request = require("request");

//this route is for search from lyrics
router.get('/', (req, res, next) => {
  res.send({ response: "OK" })
})

router.post('/', (req, res, next) => {
  // const API_KEY = process.env.LYRICS_API_KEY
  // const title = req.body.title;
  // const lyrics = "every night in my dream"
  const userSearchInput = req.body.text;
  console.log(req.body)
    request({
      url: `https://genius.com/api/search/lyric?q=${userSearchInput}&page=2&per_page=20`,
      method: 'GET',  
    },
      (error, response, body) => {
        if (error) {
          console.log(error)
        } else {
          res.send(JSON.parse(body))
        }
      })

})

module.exports = router;