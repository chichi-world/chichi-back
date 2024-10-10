const { Op } = require("sequelize");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

// 공통 에러 처리 함수
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
};

// 모든 리뷰 가져오기 (최신순, 별점순 정렬, 검색 추가)
const getAllReviews = async (req, res) => {
  const { orderBy, search } = req.query;

  try {
    let order = [["createdAt", "DESC"]]; // 기본값은 최신순
    if (orderBy === "rating") {
      order = [["rating", "DESC"]]; // 별점 높은 순
    }

    // 검색 조건 추가
    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Op.or]: [
          { content: { [Op.like]: `%${search}%` } },
          { "$User.nickname$": { [Op.like]: `%${search}%` } }, // 작성자 닉네임에서 검색
        ],
      };
    }

    const reviews = await Review.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
      order,
    });
    res.status(200).json(reviews);
  } catch (err) {
    handleError(res, err);
  }
};

// 특정 리뷰 가져오기
const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    handleError(res, err);
  }
};

// 리뷰 작성
const createReview = async (req, res) => {
  const { userId, content, rating } = req.body;

  try {
    const newReview = await Review.create({
      userId,
      content,
      rating,
    });
    res.status(201).json({ message: "Review created successfully", newReview });
  } catch (err) {
    handleError(res, err);
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
    handleError(res, err);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
};
