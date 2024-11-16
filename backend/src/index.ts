import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { TodosController } from "./controllers/todos";
import { ConfigLoader } from "./config/config-loader";
import { initDataSource } from "./config/data-source";
import { Todo } from "./entity/todo";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config({ path: ".env.local" });

const setup = async () => {
  // Configuration
  const config = new ConfigLoader().load();
  const dataSource = await initDataSource(config.database);
  const app = express();

  // Register handlers
  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  const todosRepository = dataSource.getRepository(Todo);
  const todosController = new TodosController(todosRepository);
  app.use("/todos", todosController.router());
  app.use(errorHandler);

  // Start
  app.listen(config.port, () => {
    console.log(`Listening at http://localhost:${config.port}`);
  });
};

setup();
