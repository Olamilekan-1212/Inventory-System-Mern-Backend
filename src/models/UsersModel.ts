import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["staff", "admin"],
    default: "staff",
  },
  profilePhoto: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
