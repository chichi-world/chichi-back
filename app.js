const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// 미들웨어 설정
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

// 에러 처리
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
