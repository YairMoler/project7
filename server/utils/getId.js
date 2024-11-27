const con = require("../con");
async function getId(username) {
    console.log("here");
    return await con.query(`select id from users where username = '${username}'`, function (err, result) {
        console.log("err: ", err);
        console.log("result: ", result);
        if (err) throw err;

        return result;
    });
}
module.exports = getId;
