var mysql = require("mysql");
const con = require("./con");
const fs = require("fs/promises");

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  createTables();
});

const filenames = ["users", "todos", "passwords", "posts", "comments"];
async function createTables() {
  console.log("filenames: ", filenames);
  for (let filename of filenames) {
    let sqlStr = `create table ${filename} (id int primary key auto_increment`;
    try {
      let file = await fs.readFile(`../entities/${filename}.json`, "utf8");

      const data = JSON.parse(file);

      if (!file) throw error("cannot read file");
      for (let key in data) {
        sqlStr = `${sqlStr} ,${key} ${data[key]} `;
      }
      sqlStr = sqlStr + ")";
      console.log("sqlStr: ", sqlStr);

      con.query(sqlStr, function (err, result) {
        if (err) throw err;
        console.log("success!");
      });
    } catch (err) {
      console.log(err);
    }
  }
}
