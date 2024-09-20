const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

// 유저 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
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
  },
  {
    timestamps: true,
    tableName: "users",
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
