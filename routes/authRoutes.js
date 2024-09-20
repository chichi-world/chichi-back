const express = require("express");
const router = express.Router();

// 예시: 회원가입 라우트
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // 여기에 회원가입 처리 로직을 작성
  res.json({ message: "User registered successfully" });
});

// 예시: 로그인 라우트
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 여기에 로그인 처리 로직을 작성
  res.json({ message: "User logged in successfully" });
});

module.exports = router;
// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const router = express.Router();

// // 회원가입 라우트 (POST /api/auth/register)
// router.post('/register', register);

// // 로그인 라우트 (POST /api/auth/login)
// router.post('/login', login);

// module.exports = router;
