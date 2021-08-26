import {Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field } from "type-graphql"
import { Comment } from "./Comment";


@ObjectType()
@Entity()
class Answer extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    id!: string;

    @Field(() => String)
    @Column()
    user_id!: string;    //user answering the question i.e logged in user

    @Field(() => String)
    @Column()
    question_id!: string; 

    @Field()
    @Column()
    content!: string;

    @Field(() => [Comment])
    @Column()
    comments: Comment[] = [];

    constructor(user_id: string, question_id: string, content: string) {
        super();
        this.user_id = user_id;
        this.question_id = question_id;
        this.content = content;
    }

}
export { Answer }