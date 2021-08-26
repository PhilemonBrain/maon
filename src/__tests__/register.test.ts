import { User } from "../entity/User"
import { Connection } from "typeorm"
import { graphqlTestCall } from "../testUtils/graphTestCall"
import { testConn } from "../testUtils/testConn"

let con:Connection

beforeAll( async () => {
  try {
    con = await testConn()
  } catch (error) {
    console.error(error)
  }
})

afterAll(async () => {
  await con.close()
})

const registerMutation = `
  mutation Register($email: String!, $password: String!){
    USER_REGISTER(email: $email, password: $password)
  }
`

// const loginUserQuery = `
//   mutation Register($email: String!, $password: String!){
//     USER_LOGIN(email: $email, password: $password){
//       accessToken
//       error
//     }
//   }
// `

const usersQuery = `
  query users{
    USERS{
      id
    }
  }
`

describe("Register", () => {
    it("Create User", async () => {
      const resp = await graphqlTestCall({
        source: registerMutation,
        variableValues: {
          email: "secondman@gmai.com",
          password: "1212pasa"
        }
      })
      expect(resp.data!.USER_REGISTER).toBe(true);
    }),

    it("Get User", async ()=>{
      const resp = await graphqlTestCall({
        source: usersQuery
      })
      expect(resp.data!.USERS.length).toBe(1);
      const testUser = await User.find({id: resp.data!.USERS[0].id});
      expect(testUser).toBeDefined();
    })

})