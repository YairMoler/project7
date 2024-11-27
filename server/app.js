var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const loginRouter = require("./routes/login.js");
const cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/posts", postsRouter);
// app.use("/comments", commentsRouter);
app.use("/login", loginRouter);

module.exports = app;
