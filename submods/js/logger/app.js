import dotenv from "dotenv";
import { sendLog } from "./src/logger.js";

// для теста нужно задать переменную LOG_URL в файле .env в папке запуска
dotenv.config();
if (process.env.LOG_URL !== undefined) {
  console.log(process.env.LOG_URL);
  sendLog(process.env.LOG_URL, 1, "logMessage", { logParams: "logParams" });
} else
  console.log(
    "process.env.LOG_URL is undefined!!!\n create .env file with setten LOG_URL",
  );
