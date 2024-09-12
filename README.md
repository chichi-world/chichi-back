# chichi-back




chichi-backend/ v0.1
│
├── controllers/
│   └── authController.js       # 유저 회원가입, 로그인 처리
│   └── reviewController.js      # 리뷰 처리 관련 기능
│
├── models/
│   └── userModel.js             # 유저 모델
│   └── reviewModel.js           # 리뷰 모델
│
├── routes/
│   └── authRoutes.js            # 인증 관련 라우트
│   └── reviewRoutes.js          # 리뷰 관련 라우트
│
├── middleware/
│   └── authMiddleware.js        # 인증 미들웨어 (JWT 등)
│
├── config/
│   └── db.js                    # 데이터베이스 설정 (Mysql)
│
├── .gitignore                   # Git에서 무시할 파일들 (node_modules 등)
├── package.json                 # 프로젝트 메타 정보 및 의존성
├── index.js                     # 서버의 진입점
└── README.md                    # 프로젝트 설명서
