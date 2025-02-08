import dotenv from "dotenv";
dotenv.config();

interface Config {
  baseUrl: string;
  appName: string;
  port: number;
  dbName: string;
  dbUrl: string;
  tokenSecret: string;
  refreshTokenSecret: string;
  tokenHeaderKey: string;
  mailHost: string;
  saltRounds: number;
  jwtOptions: {
    expiresIn: string;
  };
  senderMail: string;
  senderMailPassword: string;
}

const config: Config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  appName: "ryven",
  port: Number(process.env.PORT) || 3000,
  dbName: "ryven-tasks",
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://studycontentsofmasumkhan:E6FZNjNRg5DyuXkX@cluster0.ty1ry.mongodb.net/",
  tokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "i-act-as-token-secret",
  refreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || "i-act-as-refresh-token-secret",
  tokenHeaderKey: process.env.tkn_header_key || "authorization",
  mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
  saltRounds: 12,
  jwtOptions: {
    expiresIn: "730h", // Token will expire after 30 days
  },
  senderMail: process.env.SENDER_MAIL || "masumkhan081.3s@gmail.com",
  senderMailPassword: process.env.SENDER_MAIL_PASSWORD || "fjtjmfhnkmrwtvbp",
};

export default config;
