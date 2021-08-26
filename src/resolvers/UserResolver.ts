// import { ApolloError } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { MyContext } from "src/MyContext";
import { addRefreshTokenToCookie, createAccessToken } from "../utils";
// import { MyContext } from "src/MyContext";
import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Mutation,
  Ctx,
  ObjectType,
  Field,
  // Ctx,
  // ObjectType,
} from "type-graphql";
import { User } from "../entity/User";
// import { hash, compare } from "bcryptjs";
// import { MyContext } from "../MyContext";
// import { addRefreshTokenToCookie, createAccessToken } from "../utils";
import { isAuth } from "../middlewares/isAuth";
// import { getConnection } from "typeorm";
// import { ApolloError } from "apollo-server-express";


@ObjectType()
class LoginResponse {
  @Field()
  accessToken?: string;

  @Field()
  error?: string;
}

@Resolver()
class UserResolver {
  @Query(() => String)
  HELLO_USER() {
    return "hi there";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  HI_USER() {
    return "restricted query";
  }

  @Query(() => User)
  async USER(@Arg("id") id: string) {
    try {
      return await User.findOne(id);
    } catch (error) {
      throw new Error("This ID is invalid");
    }
  }

  @Query(() => [User])
  async USERS() {
    const recipe = await User.find();
    if (!recipe) {
      return[{data: "No Registered Users"}];
    }
    return recipe;
    // return await User.find()
  }

  // @Mutation(() => Boolean)
  // async TEST_MUT()

  @Mutation(() => Boolean)
  async USER_REGISTER(
    @Arg("email") email: string,
    @Arg("password") password: string,
    // @Ctx("") { res }: MyContext
  ) {
    const hashpassword = await hash(
      password,
      12
    );
    try {
      User.insert({
        email,
        password: hashpassword,
      });
    } catch (error) {
      console.error(error)
      return false;
    }
    return true;
    // return res.status(201).json{};
  }

  @Mutation(() => LoginResponse)
  async USER_LOGIN(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx("") { res }: MyContext
  ):Promise<LoginResponse>{
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return {
          error: "Invalid User or Password",
          accessToken: ""
        };

      const validPassword = await compare(password, user.password);
      if (!validPassword)
      return {
        error: "Invalid User or Password",
        accessToken: ""
      };

      await addRefreshTokenToCookie(res, user);

      return {
        accessToken: createAccessToken(user),
        error: ""
      }
    } catch (error) {
      console.log(error)
      return {
        error: error.message,
        accessToken: ""
      };
    }
  }

  // @Mutation(() => Boolean)
  // async revokeRefreshTokensForUser(@Arg("userId") userId: number) {
  //   try {
  //     await getConnection()
  //     .getRepository(User)
  //     .increment({ id: userId }, "tokenVersion", 1);
  //     return true
  //   } catch (error) {
  //     return false
  //   }
  // }
}

export default UserResolver;
