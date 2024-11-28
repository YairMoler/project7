const express = require("express");
const router = express.Router();
const con = require("../con");

router.post("/", (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(400).send("missing field");
    if (req.body.username.length < 4 || req.body.password.length < 4) {
        res.status(401);
        return res.send("password or username is too short");
    }
    con.query(`SELECT * FROM users JOIN passwords ON users.id = passwords.user_id WHERE username='${req.body.username}'`, (err, result) => {
        if (err) {
            console.log("err: ", err);
            return res.status(500).send("something went wrong");
        }
        console.log("result: ", result);
        const data = result[0];
        if (!data) return res.status(401).send("password or username is incorrect");
        const password = data.password;
        if (password !== JSON.parse(req.body.password)) return res.status(401).send("password or username is incorrect");
        res.status(200).send({ username: data.username, email: data.email, id: data.id });
    });
});

module.exports = router;
