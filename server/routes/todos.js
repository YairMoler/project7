var express = require("express");
var router = express.Router();
const con = require("../con");
//get todos
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
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

//add todos
router.post("/", (req, res) => {
  const title = req.body.title;
  const user_id = req.body.user_id;
  if (!title) {
    return res
      .status(400)
      .send(JSON.stringify({ message: "your title is empty" }));
  } else {
    con.query(
      `insert into todos (user_id , title , completed) values (${user_id} , "${title}" , "${false}")`,
      function (err, result) {
        if (err) {
          res
            .status(500)
            .send(JSON.stringify({ message: "could not add the todo" }));
        } else {
          res.status(200).send(
            JSON.stringify({
              id: result.insertId,
              user_id: user_id,
              title: title,
              completed: "false",
            })
          );
          console.log("success add the todos!");
        }
      }
    );
  }
});

//delete todo
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  con.query(`delete from todos where id =${id}`, function (err, result) {
    if (err) {
      console.log("err: ", err);
      res
        .status(500)
        .send(JSON.stringify({ message: "could not delete the todo" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "succes!" }));
      console.log("success delete the todos!");
    }
  });
});

module.exports = router;
