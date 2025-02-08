import { Request, Response, NextFunction } from "express";

// import config from "../../config/index";
import { verifyToken } from "../utils/tokenisation";
import userModel from "../modules/user/user.model";

interface RequestWithUser extends Request {
  userId?: string;
  role?: string;
}

function accessControl(accessRoles: string[]) {
  return async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(403).json({
          success: false,
          message: "Access Forbidden!",
        });
        return; // Explicitly return to avoid further execution
      }

      const { success, payload } = verifyToken(token);
      console.log(`--log-- ` + JSON.stringify(payload));

      if (!success) {
        res.status(403).json({
          success: false,
          message: "Invalid token !",
        });
        return;
      }

      const email = payload?.email;

      if (!email) {
        res.status(403).json({
          success: false,
          message: "Invalid token !",
        });
        return;
      }

      // Retrieve user by email
      const user = await userModel.findOne({ email });

      if (!user) {
        res.status(403).json({
          success: false,
          message: "Access Forbidden! User not found.",
        });
        return;
      }

      req.userId = user.id;
      req.role = payload?.role;

      if (accessRoles.includes(req.role as string)) {
        // console.log("success: \n")

        next();
      } else {
        res.status(403).json({
          success: false,
          message: "Access Forbidden!",
        });
      }
    } catch (error) {
      console.error(
        "Error at accessControl:",
        error instanceof Error ? error.message : "Unknown error"
      );
      res.status(403).json({
        success: false,
        message: "Access Forbidden!",
      });
    }
  };
}

export default accessControl;
