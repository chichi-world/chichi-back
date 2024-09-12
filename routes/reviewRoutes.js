const express = require("express");
const router = express.Router();

// 예시: 모든 리뷰 가져오기
router.get("/", (req, res) => {
  // 리뷰 목록 가져오는 로직을 작성
  res.json({ message: "All reviews fetched successfully" });
});

// 예시: 특정 리뷰 가져오기
router.get("/:id", (req, res) => {
  const reviewId = req.params.id;
  // 특정 리뷰 가져오는 로직을 작성
  res.json({ message: `Review with ID ${reviewId} fetched successfully` });
});

// 예시: 새로운 리뷰 작성
router.post("/", (req, res) => {
  const { user, content } = req.body;
  // 새로운 리뷰 작성 로직을 작성
  res.json({ message: "Review added successfully" });
});

module.exports = router;
