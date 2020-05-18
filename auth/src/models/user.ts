import mongoose from "mongoose";

interface userAttr {
  email: string;
  password: string;
}

interface UserModel ex

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.static.build = (attrs: userAttr) => {
  return new User(attrs);
};

const User = mongoose.model("User", userSchema);

export { User };
