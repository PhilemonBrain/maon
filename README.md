# Awesome Project Build with TypeORM

Steps to run this project:

1. Install dependencies
2. Setup database settings inside `ormconfig.json` file --> specifically 'url' property
3. Run `yarn start` command
4. Navigate to localhost:<port>/graphql on your browser and you will be redirected to apollo studio or you can query directly with postman.
5. Some of the endpoints are restricted to logged in user, so after you register you need run the Login mutation and and an accesstoken will be provided. This token will be used as a 'Bearer token' for those endpoints. (i am working on the assumption that you are familiar with graphql queries and mutation).
6. env file with the following variables ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET


Project Description:

This is a minature implementation of basic CRUD operation similar to the StackOverflow Web API.
TypeScript helps.
The choice of using grpahql over REST is purely by impulse. As a result the few tests will be directed to the GraphQL resolvers, and not over http, but will return a similar output nonetheless.

This project was built with the following tools
    1. Node(Express)
    2. TypeScript
    3. Type GraphQL
    4. TypeORM
    5. Apollo Server Express
    6. MongoDB(via TypeORM)

Files and Folder Description

'src/entity' contains files each representing a data model.
'src/middlewares/isAuth' middleware to be used to authenticate a user making a request 
'src/resolvers' => Each resolver in this folder contains queries and mutations for that model. 
'src/testUtils' => util files used to create fresh connections for a test environment. 'src/testUtils/testConn.ts' line 6 needs a mongodb url that will be used in the test environment.
'src/server.ts' is the entry point of the app. The express App instance initialized in the 'src/index.ts' is export so that it can also be used to create tests via http.


Actions
USER -> returns a single user given an ID
USERS -> returns all registered users
USER_REGISTER -> registers a user with given an email and password.
USER_LOGIN -> Logs a User in an returns an accesstoken or error message

CREATE_QUESTION -> creates a question for the loggen in User. requires an access token for Authentication
GET_QUESTION -> returns a single user given a question Id
GET_QUESTIONS -> returns all Questions



CREATE_ANSWER -> creates a answer for the loggen in User. requires an access token for Authentication
GET_QUESTION -> returns a single user given a question Id
GET_ANSWERS -> returns all Answers


Inconsistencies:
Return values: I toggled between returning booleans, string and throwing errors.This does not reflect my programming style. Normally i would have a single of few return ObjectTypes as payloads with a data and error fields.
Tests: I wrote a few tests. I fully understand and practise TDD. I planned to write more but i had challenges with type-graph which i never experienced and it took a lot a while to figure out.
Validation: Normally, i'm a big fan of JOI. But didnt have time to implement it.