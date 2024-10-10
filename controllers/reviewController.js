const Review = require("../models/reviewModel");
const User = require("../models/userModel"); // 작성자 검색을 위해 필요

// 모든 리뷰 가져오기 (최신순, 별점순 정렬, 검색 추가)
const getAllReviews = async (req, res) => {
  const { orderBy, search } = req.query; // 쿼리 파라미터로 정렬 기준 및 검색어를 받음

  try {
    let order = [["createdAt", "DESC"]]; // 기본값은 최신순
    if (orderBy === "rating") {
      order = [["rating", "DESC"]]; // 별점 높은 순
    }

    // 검색 조건 추가
    let whereCondition = {};
    if (search) {
      whereCondition = {
        content: { [Op.like]: `%${search}%` }, // 리뷰 내용에서 검색
      };
    }

    const reviews = await Review.findAll({
      where: whereCondition,
      include: [
        {
          model: User, // 작성자 정보 포함
          attributes: ["nickname"],
        },
      ],
      order,
    });
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
