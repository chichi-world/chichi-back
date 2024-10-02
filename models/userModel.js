const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

// 유저 모델 정의
const User = sequelize.define(
  "User",
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signupDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // 가입 날짜, 기본값은 현재 시간
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true, // 마지막 접속 날짜
    },
  },
  {
    timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 생성
    tableName: "users", // 테이블 이름 설정
  }
);

// 비밀번호 암호화 (유저 생성 전)
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// 비밀번호 비교 메서드
User.prototype.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// 테이블 생성 (필요시)
(async () => {
  await sequelize.sync();
})();

module.exports = User;
