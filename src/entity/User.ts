import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ObjectIdColumn, BaseEntity } from "typeorm";
// import { Answer } from "./Answer";
// import { Question } from "./Question";
// import { Comment } from "./Comment";


@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => String)
    @ObjectIdColumn()
    id!: string;

    @Field()
    @Column()
    username!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!: string;

    @Field(() => [String])
    @Column()
    questions: string[] = [];

    @Field(() => [String])
    @Column()
    answers: string[] = [];

    @Field(() => [String])
    @Column()
    comments: string[] = [];

    // @Field(() => Question)
    // @Column(() => Question)
    // questions!: Question[];

    // @Field(() => Answer)
    // @Column(() => Answer)
    // answers!: Answer[];

    // @Field(() => Comment)
    // @Column(() => Comment)
    // comments!: Comment[];

}
