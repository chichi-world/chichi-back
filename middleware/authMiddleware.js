const jwt = require("jsonwebtoken");

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  // 요청 헤더에서 Authorization 토큰 가져오기
  const token = req.header("Authorization");

  // 토큰이 없을 경우
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 유저 정보를 요청 객체(req)에 추가
    req.user = decoded;
    // 다음 미들웨어 또는 라우트 핸들러로 이동
    next();
  } catch (error) {
    // 토큰이 유효하지 않을 경우
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
