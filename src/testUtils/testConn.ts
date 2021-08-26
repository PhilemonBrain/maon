import { createConnection } from "typeorm"

const testConn = () => {
    return createConnection({
      type: "mongodb",
      url:"mongodb+srv://philemonBrain:0q22qeY8FNO0Waya@mycluster.vuxlq.mongodb.net/testDb?retryWrites=true&w=majority",
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [
         "src/entity/**/*.ts"
      ],
      migrations: [
         "src/migration/**/*.ts"
      ],
      subscribers: [
         "src/subscriber/**/*.ts"
      ],
      cli: {
         "entitiesDir": "src/entity",
         "migrationsDir": "src/migration",
         "subscribersDir": "src/subscriber"
      }

    })
}

export { testConn }