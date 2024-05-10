var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

var usersRouter = require("./routes/users");
var bibleRouter = require("./routes/bible");
var authRouter = require("./routes/oauth");
var requestRouter = require("./routes/request");
var carouselRouter = require("./routes/carousels");

const baseUrl = path.join(__dirname, "public");

var app = express();

app.use("/images", express.static("images"));
app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`${baseUrl}/images/${imageName}`);
});

app.use("/blogs", express.static("blogs"));
app.get("/blog/:blogName", (req, res) => {
  const blogName = req.params.blogName;
  res.sendFile(`${baseUrl}/blogs/${blogName}`);
});

app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", [
    "X-Requested-With",
    "content-type",
    "credentials",
  ]);
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.status(200);
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//mongoose setup
mongoose.connect(process.env.MONGO_URL, {
  w: "majority",
  family: 4,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const MongoStore = require("connect-mongo");
var sess = {
  secret: process.env.CONNECT_MONGO_SECRET,
  saveUninitialized: true, // create session before something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 60 * 5,
    collectionName: "mongoSessions",
  }),
  touchAfter: 60 * 5,
  collectionName: "mongoSessions",
  cookie: {},
};
if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.set("trust proxy", 1);
}
app.use(session(sess));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(baseUrl));
app.use(cors());

app.use("/users", usersRouter);
app.use("/", bibleRouter);
app.use("/", carouselRouter);
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
