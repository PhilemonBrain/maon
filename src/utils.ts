import { sign } from "jsonwebtoken";
import { User } from "./entity/User";
import { Response } from "express";

const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "20m",
  });
};

const createRefreshToken = async (user: User) => {
  return sign( { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

const addRefreshTokenToCookie = async (res: Response, user: User) => {
  try {
    res.cookie("refreshToken", await createRefreshToken(user));
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createAccessToken, createRefreshToken, addRefreshTokenToCookie}