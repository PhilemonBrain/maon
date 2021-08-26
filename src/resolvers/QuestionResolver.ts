import { Ctx, Mutation, Resolver } from "type-graphql";
import { Question } from "../entity/Question";
import { isAuth } from "../middlewares/isAuth";
import { Query, UseMiddleware, Arg } from "type-graphql";
import { MyContext } from "src/MyContext";
import { getMongoRepository } from "typeorm";
import { User } from "../entity/User";


@Resolver()
export class QuestionResolver {
  @Query(() => String)
  HELLO_QUESTION() {
    return "Hi from Questions";
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async CREATE_QUESTION(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx(""){ payload }: MyContext
  ):Promise<Boolean> {
    try {
      const user = await User.findOne(payload!.userId);
      
      if (!user) return false;
      
      let question = new Question(user.id, title, content);
      
      await getMongoRepository(User).update(user.id, {questions: [...user.questions, question.id]})
      await question.save()

    } catch (error) {
      console.error(error)
      return false
    }
    return true;
  }

  @Query(() => Question)
  async GET_QUESTION(@Arg("id") id: string) {
    try {
      return await Question.findOne(id);
    } catch (error) {
      throw new Error("This ID is invalid");
    }
  }

  @Query(() => [Question])
  async GET_QUESTIONS() {
    const questions = await Question.find();
    if (!questions) {
      return[{data: "No Registered Questions"}];
    }
    return questions;
    // return await Question.find()
  }
}
// export default QuestionResolver;