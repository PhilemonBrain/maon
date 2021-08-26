import {Entity, Column, ObjectIdColumn} from "typeorm";
import { ObjectType, Field } from "type-graphql"
// import { Question } from "./Question";
// import { Answer } from "./Answer";

@ObjectType()
@Entity()
export class Comment {

    @Field(() => String)
    @ObjectIdColumn()
    id!: string;

    @Field()
    @Column()
    content!: string;

    @Field(() => String)
    @Column()
    question_id?: string;

    @Field(() => String)
    @Column()
    user_id?: string;

    @Field(() => String)
    @Column()
    answer_id?: string;
}
