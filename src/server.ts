// import { ApolloServer } from "apollo-server-express";
// import { config } from "process";
import { createServer } from "./index";

const port = process.env.PORT || 4003;
createServer().then(({app}) => {
    app.listen(port, () => console.log(`Listening at port ${port}`))
})
