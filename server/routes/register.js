const express = require("express");
const router = express.Router();
const con = require("../con");

router.post("/", (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) return res.status(400).send("missing field");
    if (req.body.username.length < 4 || req.body.password.length < 4) return res.status(400).send("password or username is too short");
    con.query(`INSERT INTO users (username, email) VALUES ("${req.body.username}", "${req.body.email}")`, (err, result) => {
        console.log("in first query");

        if (err) {
            console.log("err: ", err);
            return res.status(400).send("username or email already exist");
        }
        console.log(result);
        const newID = result.insertId;
        con.query(`INSERT INTO passwords (password, user_id) VALUES ("${req.body.password}", ${newID})`, (err, result) => {
            console.log("in second query");
            if (err) {
                console.log("err: ", err);
                return res.status(500).send("something went wrong");
            }
            res.status(200).send({ username: req.body.username, email: req.body.email, id: newID });
        });
    });
});

module.exports = router;
