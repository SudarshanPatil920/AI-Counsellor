import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";

export const signup = async (name, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashed);
  const token = signToken({ id: user.id });
  return { user, token };
};

export const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({ id: user.id });
  return { user, token };
};
