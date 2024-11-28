var express = require("express");
var router = express.Router();
const con = require("../con");

router.get("/", async (req, res) => {
  const post_id = req.query.post_id;
  console.log("post_id : ", post_id);
  if (!post_id) {
    return res
      .status(400)
      .send(
        JSON.stringify({ message: "there is no post-id for the comments" })
      );
  }
  con.query(
    `select * from comments where post_id = ${post_id}`,
    function (err, result) {
      if (err) {
        res
          .status(500)
          .send(JSON.stringify({ message: "could not send the comments" }));
      } else {
        res.status(200).send(JSON.stringify(result));
        console.log("success get the comments!");
      }
    }
  );
});

router.post("/", (req, res) => {
  const name1 = req.body.name;
  const body = req.body.body;
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  console.log(req.body);
  if (!name1 || !body) {
    return res
      .status(400)
      .send(JSON.stringify({ message: "name/body is empty" }));
  } else {
    con.query(
      `insert into comments (user_id , post_id ,body , name ) values (${user_id} ,${post_id} , "${body}" , "${name1}")`,
      function (err, result) {
        if (err) {
          console.log("err: ", err);
          res
            .status(500)
            .send(JSON.stringify({ message: "could not add the comment" }));
        } else {
          res.status(200).send(
            JSON.stringify({
              id: result.insertId,
              post_id: post_id,
              user_id: user_id,
              name: name1,
              body: body,
            })
          );
          console.log("success add the comment");
        }
      }
    );
  }
});
//delete comment
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  con.query(`delete from comments where id =${id}`, function (err, result) {
    if (err) {
      console.log("err: ", err);
      res
        .status(500)
        .send(JSON.stringify({ message: "could not delete the comment" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "succes!" }));
      console.log("success delete the comment!");
    }
  });
});

module.exports = router;
