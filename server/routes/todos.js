var express = require("express");
var router = express.Router();
const con = require("../con");
const getId = require("../utils/getId");

router.get("/", async (req, res) => {
  const username = req.query.username;
  console.log("username: ", username);
  const user_id = await getId(username);
  console.log("user_id : ", user_id);
  if (!user_id) {
    return res
      .status(400)
      .send(JSON.stringify({ message: "there is no user-id for the todos" }));
  }
  con.query(
    `select * from todos where user_id = ${user_id}`,
    function (err, result) {
      if (err) {
        res
          .status(500)
          .send(JSON.stringify({ message: "could not send the todos" }));
      } else {
        res.status(200).send(JSON.stringify(result));
        console.log("success get the todos!");
      }
    }
  );
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const username = req.body.username;
  const user_id = getId(username);
  con.query(`insert into `, function (err, result) {
    if (err) {
      res
        .status(500)
        .send(JSON.stringify({ message: "could not send the todos" }));
    } else {
      res.status(200).send(JSON.stringify(result));
      console.log("success get the todos!");
    }
  });
});
module.exports = router;
