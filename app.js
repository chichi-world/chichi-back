const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// 라우트 파일 불러오기
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// 미들웨어 설정
// 로그 설정
const loggerMode = process.env.NODE_ENV === "production" ? "combined" : "dev"; // 환경에 따라 로그 레벨 설정
app.use(morgan(loggerMode));

app.use(express.json()); // Express의 내장된 body-parser 사용
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

// 404 에러 처리
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
