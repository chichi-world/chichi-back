const { Sequelize } = require("sequelize");

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  "your_database_name",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
