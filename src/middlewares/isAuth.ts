import { MyContext } from "src/MyContext";
import { verify } from "jsonwebtoken"; 
import {
  MiddlewareFn,
} from "type-graphql/dist/interfaces/Middleware";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) throw new Error("not authenticated");

  try {
    const token = authorization.split(" ")[1];
    verify(token, process.env.ACCESS_TOKEN_SECRET!, (error, decoded) => {
      if (error && error.message) throw new Error("Not Unauthenticated")
      context.payload = decoded as any;
    });
    return next()
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};