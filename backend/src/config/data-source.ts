import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "../entity/todo";
import { DatabaseConfig } from "./config-loader";

/** Initializes TypeORM data source. */
export async function initDataSource(config: DatabaseConfig) {
  return await new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: true,
    logging: false,
    entities: [Todo],
    migrations: [],
    subscribers: [],
  }).initialize();
}
