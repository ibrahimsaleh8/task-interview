import { verify } from "jsonwebtoken";
export const userDataFromToken = (token: string) => {
  const UserData = verify(token, process.env.AUTH_SECRET as string);
  return UserData;
};
