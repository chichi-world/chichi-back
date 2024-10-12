const express = require("express");
const {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
} = require("../controllers/reviewController"); // 리뷰 컨트롤러 가져오기
const router = express.Router();

// 모든 리뷰 가져오기 (GET /api/reviews)
router.get("/", getAllReviews);

// 특정 리뷰 가져오기 (GET /api/reviews/:id)
router.get("/:id", getReviewById);

// 새로운 리뷰 작성 (POST /api/reviews)
router.post("/", createReview);

// 리뷰 삭제 (DELETE /api/reviews/:id)
router.delete("/:id", deleteReview);

module.exports = router;
