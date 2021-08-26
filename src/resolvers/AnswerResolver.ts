import { Resolver, Mutation, Ctx } from "type-graphql";
import { Answer } from "../entity/Answer";
import { isAuth } from "../middlewares/isAuth";
import { Query, UseMiddleware, Arg } from "type-graphql";
import { MyContext } from "../MyContext";
import { User } from "../entity/User";
import { Question } from "../entity/Question";
import { getMongoRepository } from "typeorm";
// import { Question } from "src/entity/Question";
// import { MyContext } from "src/MyContext";
// import { User } from "src/entity/User";

@Resolver()
class AnswerResolver {
  @Query(() => String)
  HELLO_ANSWER() {
    return "Hi from Answers";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  HI_ANSWER() {
    return "Restric";
  }

  @Query(() => Answer)
  async GET_ANSWER(@Arg("id") id: string) {
    try {
      return await Answer.findOne(id);
    } catch (error) {
      throw new Error("This ID is invalid");
    }
  }

  @Query(() => [Answer])
  async GET_ANSWERS() {
    const answers = await Answer.find();
    if (!answers) {
      return[{data: "No Registered Questions"}];
    }
    return answers;
    // return await Question.find()
  }

  @Mutation(()=>String)
  @UseMiddleware(isAuth)
  async CREATE_ANSWER(
    @Arg("content") content: string,
    @Arg("question_id") question_id: string,
    @Ctx(""){ payload }: MyContext
  ): Promise<String>{
    try {
      const user = await User.findOne(payload!.userId);
      const question = await Question.findOne(question_id);
      
      if (!user) return "Invalid User";
      if (!question) return "Invalid Question";
      
      let answ = new Answer(user.id, question_id, content);

      await getMongoRepository(Question).update(question.id, {answers: [...question.answers, answ]})
      await getMongoRepository(User).update(user.id, {answers: [...user.answers, answ.id]});
      
      answ.save();

      return "Completed true"
    } catch (error) {
      console.error(error)
      return "Error false"
    }
  }
}
export default AnswerResolver;