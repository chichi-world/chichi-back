const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const login = async (req, res) => {
  const { email, password } = req.body;

  // 유저가 데이터베이스에 있는지 확인
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // JWT 생성
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // 1시간 유효
    }
  );

  // 토큰 반환
  res.json({ token });
};

module.exports = { login };
