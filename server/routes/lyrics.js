const express = require("express");
const router = express.Router();
const request = require("request");
const getlyrics = require("./helpers/getLyrics");

//this route is for search from lyrics
router.get("/", (req, res, next) => {
  res.send({ response: "OK" });
});

router.post("/", (req, res, next) => {
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

        getlyrics(data).then((data) => {
          res.send(data);
        });
      }
    }
  );

});


module.exports = router;
