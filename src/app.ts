import express, { Express, Request, Response } from "express";
const app: Express = express();
import dotenv from "dotenv";
dotenv.config();
import originControl from "./middlewares/corsMiddleware";
// routes
import userRoutes from "./modules/user/user.route";
import taskRoutes from "./modules/task/task.route";
//
// middlewares
app.use(originControl);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
//
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: `I am functional ${req.headers.origin}`,
  });
});
//
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
//
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
