import jwt, { SignOptions } from "jsonwebtoken";
import { MUser } from "../user/user.model";

import * as bcrypt from "bcrypt";

export const checkingPassword = async (
  password: string,
  hassPassword: string
) => {
  return hassPassword && (await bcrypt.compare(password, hassPassword));
};

export const userInfoChecking = async (email: string, password: string) => {
  const user = await MUser.isUserExistByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.isDeleted) {
    throw new Error("User has been deleted");
  }
  const isPasswordCorrect = await checkingPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }
  return user;
};

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};
