const Review = require("../models/reviewModel");

// 모든 리뷰 가져오기
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
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
  const { userId, content } = req.body;

  try {
    const newReview = await Review.create({
      userId,
      content,
    });
    res.status(201).json({ message: "Review created successfully", newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
};
