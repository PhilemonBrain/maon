import {Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field } from "type-graphql"
// import { User } from "./User";
import { Answer } from "./Answer";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
class Question extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    id!: string;

    @Field(() => String)
    @Column()
    user_id!: string;

    @Field()
    @Column()
    title!: string

    @Field()
    @Column()
    content!: string

    @Field(() => [Answer])
    @Column(() => Answer)
    answers: Answer[] = []

    @Field(() => [Comment])
    @Column(() => Comment)
    comments: Comment[] = [];

    @Field()
    @Column()
    status: Boolean = false

    constructor(user_id: string, title:string, content: string) {
        super();
        this.user_id = user_id;
        this.title = title;
        this.content = content;
    }

}
export { Question }