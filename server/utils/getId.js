const con = require("../con");
function getId(username) {
  console.log("here");
  return con.query(
    `select id from users where username = '${username}'`,
    function (err, result) {
      if (err) throw err;

      console.log("result: ", result);
      return result;
    }
  );
}
module.exports = getId;
