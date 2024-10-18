import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  pic: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
