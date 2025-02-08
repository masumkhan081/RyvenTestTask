import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import { userRoles } from "../../config/constants";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email must be less than 100 characters"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: Object.values(userRoles),
        message: "Role must be either ADMIN, STUDENT",
      },
      default: "STUDENT",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [55, "Full name must be less than 55 characters"],
    },
    phone: {
      type: String,
      unique: true,
    },
    gender: {
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

// Pre-save middleware to hash the password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

export default mongoose.model("User", userSchema);
