const express = require("express");
const router = express.Router();
const request = require("request");
const getlyrics = require("./helpers/getLyrics");


router.get("/", (req, res, next) => {
  res.send({ result: "Ok" });
});

router.post("/", (req, res, next) => {
  const title = req.body.title;
  console.log("CHECKING IF HIT")
  request(
    {
      url: `https://api.deezer.com/search/track?q=${title}`,
      method: "GET",
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log("GOT HERE")
        console.log("THIS IS THE RESPONSE", response)
        res.send(body);

        //  send song URL to App component 
        // make data available in GET request and then call it in App.js
        // make a function that GETS 
      }
    }
  );
});

router.get("/lyrics", (req, res, next) => {
  res.send({ response: "OK" });
});

router.post("/lyrics", (req, res, next) => {
  const API_KEY = process.env.LYRICS_API_KEY;
  const title = req.body.title;
  const artist = req.body.artist;

  const song = encodeURIComponent(`${title}${artist}`);

  request(
    {
      url: `https://api.genius.com/search?q=${song}&access_token=${API_KEY}`,
      method: "GET",
      Authorization: `Bearer ${API_KEY}`,
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {

        getlyrics(JSON.parse(body)).then((data) => {
          
          res.send(data);
        });
      }
    }
  );

});

module.exports = router;
