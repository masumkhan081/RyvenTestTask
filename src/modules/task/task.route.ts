import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "./task.controller"; // controller functions
import validateRequest from "../../middlewares/validateRequest";
import {} from "./task.validate";
import { validateObjectId } from "../../middlewares/validateId";
import accessControl from "../../middlewares/aceessControl";
import { userRoles } from "../../config/constants";
import { taskSchema, updateTaskSchema } from "./task.validate";

router.get("/", accessControl([userRoles.student, userRoles.admin]), getTasks);

router.get(
  "/:id",
  validateObjectId,
  accessControl([userRoles.student, userRoles.admin]),
  getSingleTask
);

router.post(
  "/",
  accessControl([userRoles.student]),
  validateRequest(taskSchema),
  createTask
);

router.patch(
  "/:id",
  accessControl([userRoles.student]),
  validateObjectId,
  validateRequest(updateTaskSchema),
  updateTask
);

router.delete(
  "/:id",
  accessControl([userRoles.student]),
  validateObjectId,
  deleteTask
);

//
export default router;
