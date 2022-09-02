const express = require('express');
const router = express.Router();
const request = require("request")
const cheerio = require('cheerio')

router.get('/', async (req, res, next) => {
  const API_KEY = process.env.LYRICS_API_KEY
  const title = 'My Heart Will Go On';
  const artist = 'Celine Dion';
  const song = encodeURIComponent(`${title} ${artist}`)

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.genius.com/search?q=${song}&access_token=${API_KEY}`,
      method: 'GET',
      Authorization: `Bearer ${API_KEY}`
    },
      (error, response, body) => {
        if (error) {
          console.log(error)
        } else {
          return resolve(JSON.parse(body))
        }
      })
  })
  .then((data) => {
    const songsArr=[]
    data.response.hits.map((val) => {songsArr.push(val)})
    const lastsongsArr = songsArr[songsArr.length-1]
    console.log(lastsongsArr)
    const { full_title,artist_names, song_art_image_url, id, url } = lastsongsArr.result;
        request({
          url: `${url}`,
          method: 'GET',
        },
          (error, response, body) => {
            const $=cheerio.load(body)
            let lyrics = $('div[class="lyrics"]').text().trim();
            if (!lyrics) {
              lyrics = '';
              $('div[class^="Lyrics__Container"]').each((i, elem) => {
                if ($(elem).text().length !== 0) {
                  let snippet = $(elem)
                    .html()
                    .replace(/<br>/g, '\n')
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
                  lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
                }
              });
            }
            const songInfo= {song_id:id, title: full_title,artist:artist_names,song_img:song_art_image_url,lyrics:lyrics}
            res.send(songInfo)
        })
  })

});

module.exports = router;