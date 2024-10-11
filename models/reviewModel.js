const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// 리뷰 모델 정의
const Review = sequelize.define(
  "Review",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // 참조할 테이블 이름
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products", // 참조할 테이블 이름
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // 자동으로 createdAt, updatedAt 필드를 추가합니다.
    tableName: "reviews", // 테이블 이름 설정
  }
);

module.exports = Review;
