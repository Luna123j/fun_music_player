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

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.status(200).send("ok");
});

router.post("/login", (req, res) => {
  const {username, password} = req.body;
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

module.exports = router;
