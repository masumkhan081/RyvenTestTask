import { Request, Response } from "express";
import express from "express";
const app = express();
import config from "./config";

app.listen(config.port, () => {
  console.log("server started");
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("check-health: Good !");
});
