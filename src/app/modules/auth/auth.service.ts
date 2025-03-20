import { config } from "../../config";
import { TLogin } from "./auth.interface";
import { createToken, userInfoChecking } from "./auth.utils";

const loginUser = async (payload: TLogin) => {
  const user = await userInfoChecking(payload.email, payload.password);
  const JwtData = {
    email: user.email,
    role: user.role,
  };
  const token = createToken(
    JwtData,
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );
  return { accessToken: token };
};

export const authService = {
  loginUser,
} as const;
