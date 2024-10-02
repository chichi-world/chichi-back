const express = require("express");
const router = express.Router();

// 예시: 회원가입 라우트
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // 여기에 회원가입 처리 로직을 작성
  res.json({ message: "User registered successfully" });
});

// 예시: 로그인 라우트
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 유저가 존재하는지 확인
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 마지막 접속 기록 갱신
    user.lastLogin = new Date();
    await user.save();

    // JWT 생성 (예시)
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // 토큰 반환
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = router;
// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const router = express.Router();

// // 회원가입 라우트 (POST /api/auth/register)
// router.post('/register', register);

// // 로그인 라우트 (POST /api/auth/login)
// router.post('/login', login);

// module.exports = router;
