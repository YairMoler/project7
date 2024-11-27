var express = require("express");
var router = express.Router();
const con = require("../con");

//get all posts
router.get("/", async (req, res) => {
  con.query(`select * from posts `, function (err, result) {
    if (err) {
      res
        .status(500)
        .send(JSON.stringify({ message: "could not send the posts" }));
    } else {
      res.status(200).send(JSON.stringify(result));
      console.log("success get the posts!");
    }
  });
});

//add post
router.post("/", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const user_id = req.body.user_id;
  if (!title || !body) {
    return res
      .status(400)
      .send(JSON.stringify({ message: "title or body is empty" }));
  } else {
    con.query(
      `insert into posts (user_id , title ,body) values (${user_id} , "${title}" , "${body}")`,
      function (err, result) {
        if (err) {
          res
            .status(500)
            .send(JSON.stringify({ message: "could not add the post" }));
        } else {
          res.status(200).send(JSON.stringify({ message: " add succeed!" }));
          console.log("success add the post");
        }
      }
    );
  }
});

module.exports = router;
