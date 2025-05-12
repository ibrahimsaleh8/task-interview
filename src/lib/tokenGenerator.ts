import { sign } from "jsonwebtoken";
import { userPayloadDataType } from "./types";
export const generatedToken = (userPayload: userPayloadDataType) => {
  const token = sign(userPayload, process.env.AUTH_SECRET as string, {
    expiresIn: 7 * 24 * 60 * 60,
  });
  return token;
};
