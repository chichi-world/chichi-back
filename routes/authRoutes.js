const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// 회원가입 라우트 (POST /api/auth/register)
router.post("/register", register);

// 로그인 라우트 (POST /api/auth/login)
router.post("/login", login);

module.exports = router;
