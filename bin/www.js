#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("../app");
const http = require("http");
const debug = require("debug")("chichi:server");

// 포트 설정
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// 서버 생성
const server = http.createServer(app);

// 서버 리스닝
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * 포트를 정상적으로 정규화
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * 에러 처리
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // 특정 에러 처리
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * 서버가 리스닝 중일 때의 처리
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(`Server running on http://localhost:${port}`);
}
