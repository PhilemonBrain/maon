import { createConnection } from "typeorm"

const testConn = () => {
    return createConnection({
      type: "mongodb",
      url:"Test DB to use",
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