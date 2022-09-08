const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
const bcrypt = require("bcryptjs");

const getUsernameLookUp = (username) => {
  const queryText = `Select * from users where username = $1`;
  const params = [username];

  return db
    .query(queryText, params)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => console.error(err));
};

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.status(200).send("ok");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(400).end();
  }
  getUsernameLookUp(username)
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        res.json({ error: "User not exist" });
      } else {
        console.log("%%%%%%%%%", password, data);
        if (bcrypt.compareSync(password, data[0].password)) {
          res.send(data[0]);
        } else {
          res.send({error: "password is wrong"})
        }
      }
    })
    .catch((err) => console.error(err));
});

router.get("/signup", (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    res.status(400).end();
  }
  res.status(200).end();
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(400).end();
  }
  getUsernameLookUp(username).then((data) => {
    console.log(data);
    if (data.length !== 0) {
      res.json({ error: "User exist" });
    } else {
      console.log("%%%%%%%%%", req.body);
      usernameInfo = username;
      const queryText = `INSERT INTO users (username, password) VALUES ( $1, $2)`;
      const params = [username, `${bcrypt.hashSync(password, 10)}`];
      db.query(queryText, params).then(() => {
        db.query(`Select * from users where username = $1`, [username])
          .then((data) => {
            // eslint-disable-next-line camelcase
            res.send(data.rows[0]);
          })
          .catch((err) => console.error(err));
      });
    }
  });
});

router.get("/history", (req, res) => {
  res.status(200).send("ok");
});

router.post("/history", (req, res) => {
  // console.log(req.body);
  const songDetails = req.body.currentSong || [];
  const username = req.body.username;
  // const username = "mario@mushroomkindom.jp";

  if (username !== "undefined" ) {
    if(songDetails.length=== 0){
      return db
            .query(
              `Select * from songs 
              join histories on histories.id = songs.history_id
              join users on histories.user_id = users.id
              where username = $1`,
              [username]
            )
            .then((data) => {
              console.log(data.rows);
              res.send(data.rows);
            });
    }else{

      return db
        .query(
          `Select * from users 
          join histories on users.id = histories.user_id
          join songs on songs.history_id = histories.id
          where username = $1 and title = $2`,
          [username, songDetails.title]
        )
        .then((data) => {
          console.log("***********this*********", data.rows);
          if (data.rows.length === 0) {
            return db
              .query(`select * from users where username = $1`, [username])
              .then((data) => {
                console.log(data.rows);
                return db
                  .query(
                    `INSERT INTO histories (user_id) VALUES ($1) RETURNING id`,
                    [data.rows[0].id]
                  )
                  .then((data) => {
                    // console.log("^^^^^^^^^^^^^^after insert histories",someDetails)
                    const songDetailsArr = [
                      songDetails.title,
                      songDetails.artist,
                      songDetails.image,
                      songDetails.mp3Url,
                      songDetails.lyrics,
                      data.rows[0].id,
                    ];
                    console.log("songdetails", songDetailsArr);
                    return db
                      .query(
                        `INSERT INTO songs (title,artist,cover,url,lyric,history_id) VALUES ($1,$2,$3,$4,$5,$6)`,
                        songDetailsArr
                      )
                      .then((data) => {
                        return db
                          .query(
                            `Select * from songs 
                            join histories on histories.id = songs.history_id
                            join users on histories.user_id = users.id
                            where username = $1`,
                            [username]
                          )
                          .then((data) => {
                            console.log(data.rows);
                            res.send(data.rows);
                          
                          });
                      });
                  });
              });
          } 
        })
    }

  }
})




module.exports = router;
