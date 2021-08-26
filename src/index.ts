import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import AnswerResolver  from "./resolvers/AnswerResolver";
import { QuestionResolver } from "./resolvers/QuestionResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";


const createServer = async () => {
  console.log("starting....")
  try {
    await createConnection()
      .then(() => console.log("connection created"))
      .catch((e) => console.error(e));
      
    } catch (error) {
      console.log(error);
    }
    const app = express();

    const apolloserver = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, QuestionResolver, AnswerResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
    });

    await apolloserver.start();

    app.use(cors({
      origin:"http://localhost:3000",
      credentials: true
    }))
    app.use(cookieParser());

    app.get("/", (_, res) => res.send("Hello From Express"));
    // const response  = await apolloserver.executeOperation({    })
    // console.log("Response", response);

    apolloserver.applyMiddleware({ app });

    return { app };
};

export { createServer }