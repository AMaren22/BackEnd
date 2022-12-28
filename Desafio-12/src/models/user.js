import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

UserSchema.methods.encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch {
    throw new Error(error);
  }
};

export const UserModel = model("users", UserSchema);
