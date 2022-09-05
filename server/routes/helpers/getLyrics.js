const request = require("request");
const cheerio = require('cheerio');

const getlyrics = function(data) {
  const songsArr = []
  data.response.hits.map((val) => { songsArr.push(val) })
  const lastsongsArr = songsArr[songsArr.length - 1]
  let songInfoWithLyrics;
  const { full_title, artist_names, song_art_image_url, id, url } = lastsongsArr.result;
  return new Promise((resolve, reject) => {
    request({
      url: `${url}`,
      method: 'GET',
    },
      (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          const $ = cheerio.load(body)
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
          if (!lyrics.includes("825 ALL NIGHT")) {
            songInfoWithLyrics = { song_id: id, title: full_title, artist: artist_names, song_img: song_art_image_url, lyrics: lyrics };
          } else {
            songInfoWithLyrics = { song_id: id, title: full_title, artist: artist_names, song_img: song_art_image_url, lyrics: "lyrics not found" };
          }
          return resolve(songInfoWithLyrics);
        }
      })
  })
}

module.exports = getlyrics;