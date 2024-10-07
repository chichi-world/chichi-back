const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// 회원가입
const register = async (req, res) => {
  const { email, password, nickname } = req.body;

  try {
    // 유저가 이미 존재하는지 확인
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    user = await User.create({
      email,
      password: hashedPassword,
      nickname,
      signupDate: new Date(), // 가입 날짜 저장
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 로그인
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 유저가 존재하는지 확인
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 마지막 접속 기록 갱신
    user.lastLogin = new Date();
    await user.save();

    // JWT 생성
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // 토큰 만료 시간
      }
    );

    // 토큰 반환
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 로그아웃
const logout = (req, res) => {
  // 클라이언트 측에서 토큰을 삭제하라는 응답 전송
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { register, login, logout };
