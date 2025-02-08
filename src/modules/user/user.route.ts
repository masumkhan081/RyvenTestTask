import express, { Request, Response } from "express";
const router = express.Router();

import userController from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginSchema,
  registerSchema,
  emailSchema,
  otpVerSchema,
  resetPassSchema,
} from "./user.validate";
import { userRoles } from "../../config/constants";
import userModel from "./user.model";
import { createToken, getHashedPassword } from "../../utils/tokenisation";

//
router.post(
  "/register",
  validateRequest(registerSchema),
  userController.registerUser
);
//
router.post(
  "/email-verification",
  validateRequest(otpVerSchema),
  userController.verifyEmail
);
//
router.post(
  "/request-email-verification",
  validateRequest(emailSchema),
  userController.requestEmailVerification
);
//
router.post("/login", validateRequest(loginSchema), userController.login);

router.post(
  "/recovery",
  validateRequest(emailSchema),
  userController.requestAccountRecovery
);
//
router.get("/recovery/:token", userController.verifyAccountRecovery);
//
router.post(
  "/reset-password",
  validateRequest(resetPassSchema),
  userController.updatePassword
);
//
// test user generation to get token to check accessControl middlewre
router.post(
  "/test-account",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { role, fullName, email, password, confirmPassword } = req.body;

      if (![userRoles.student, userRoles.admin].includes(role)) {
        res.status(500).json({
          message: "Invalid role",
        });
        return;
      }
      if (password !== confirmPassword) {
        res.status(500).json({
          message: "Password doesn't match",
        });
        return;
      }
      const existing = await userModel.findOne({ email });
      if (existing) {
        res.status(500).json({
          message: "Email already registered",
        });
        return;
      }

      const hashedPassword = await getHashedPassword(req.body.password);

      const user = await new userModel({
        fullName,
        role,
        email,
        password: hashedPassword,
        isVerified: true,
      }).save();

      const token = createToken({
        userId: user.id, // id is not ideal, should be just email.
        role: user.role,
        email: user.email,
      });

      res.status(200).json({
        message:
          "Get your test account token, set on header naming the key: authentication in postman and check access-control",
        token,
      });

      //  no more validation as this is for only test purpose

      // for (const user of userData) {
      //   const existingUser = await User.findOne({ email: user.email });
      //   if (!existingUser) {
      //     await User.create(user);
      //   } else {
      //     console.log(`User with email ${user.email} already exists`);
      //   }
      // }
      // // Step 3: Create JWT tokens for each inserted user
      // const response = testUsers.map((user) => {
      //   const payload = {
      //     email: user.email,
      //     role: user.role,
      //     fullName: user.fullName,
      //   };

      //   const tkn = jwt.sign(payload,config.tokenSecret,{expiresIn: "750h"})

      //   // Generate token for each user
      //   const token = createToken({
      //     payload,
      //     expireTime: "750h", // Set expiration time for the token
      //   });

      //   return {
      //     email: user.email,
      //     password: user.password,
      //     fullName: user.fullName,
      //     role: user.role,
      //     phone: user.phone,
      //     address: user.address,
      //     token,
      //   };
      // });

      // // Step 4: Send the response with user data and tokens
      // res.status(201).json({
      //   message:
      //     "These are test accounts--- (salesman,admin,manager) for the sole purpose of testing." +
      //     "Set a token in header naming authentication inside postman, and good to go !",
      //   accounts: response,
      // });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating test accounts:", error.message);
        res
          .status(500)
          .json({ message: `Internal server error ${error.message}` });
      }
    }
  }
);

export default router;
