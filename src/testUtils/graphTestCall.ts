import { graphql } from "graphql"
import UserResolver from "../resolvers/UserResolver"
import { buildSchema, Maybe } from "type-graphql"

interface Options{
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>
}

const graphqlTestCall = async ({source, variableValues}:Options) =>{
  return graphql({
    schema: await buildSchema({
      resolvers:[UserResolver]
    }),
    source,
    variableValues
  })
}

export { graphqlTestCall }