const express = require('express');
const router = express.Router();
const request = require("request")


router.get('/', async (req, res, next) => {
  const title = 'My Heart Will Go On';
  const artist = 'Celine Dion';
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.deezer.com/search/track?q=${title}${artist}`,
        method: 'GET',
      },
        (error, response, body) => {
          if (error) {
            console.log(error)
          } else {
            return resolve(JSON.parse(body))
          }
        })
  
    }).then((data)=>{
      res.send(data);
    })
});

module.exports = router;