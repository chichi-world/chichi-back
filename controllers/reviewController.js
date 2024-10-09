const Review = require("../models/reviewModel");

// 모든 리뷰 가져오기 (최신순, 별점순 정렬 추가)
const getAllReviews = async (req, res) => {
  const { orderBy } = req.query; // 쿼리 파라미터로 정렬 기준을 받음 ('latest' 또는 'rating')

  try {
    let order = [["createdAt", "DESC"]]; // 기본값은 최신순
    if (orderBy === "rating") {
      order = [["rating", "DESC"]]; // 별점 높은 순
    }

    const reviews = await Review.findAll({ order });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 특정 리뷰 가져오기
const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({ where: { id } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 리뷰 작성
const createReview = async (req, res) => {
  const { userId, content, rating } = req.body; // 별점 추가

  try {
    const newReview = await Review.create({
      userId,
      content,
      rating,
    });
    res.status(201).json({ message: "Review created successfully", newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 리뷰 삭제
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({ where: { id } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Review.destroy({ where: { id } });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
};
