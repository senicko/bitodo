import { NextFunction, Request, Response, Router } from "express";
import { Repository } from "typeorm";
import * as z from "zod";
import { Todo } from "../entity/todo";
import { valdiateRequestBody } from "../middlewares/validator";
import { TypedRequest } from "../types/express";

const createTodoDataSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Todo title must have at least 1 character." }),
  description: z.string(),
});

type CreateTodoData = z.infer<typeof createTodoDataSchema>;

const updateTodoDataSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  archived: z.boolean().optional(),
});

type UpdateTodoData = z.infer<typeof updateTodoDataSchema>;

/** Todos resource HTTP controller. */
export class TodosController {
  constructor(private readonly todosRepository: Repository<Todo>) {}

  /** @returns express router for todos resource. */
  router() {
    const router = Router();

    router.get("/", this.getAll.bind(this));
    router.get("/:id", this.getById.bind(this));
    router.post(
      "/",
      valdiateRequestBody(createTodoDataSchema),
      this.createTodo.bind(this)
    );
    router.patch(
      "/:id",
      valdiateRequestBody(updateTodoDataSchema),
      this.updateTodo.bind(this)
    );

    router.delete("/:id", this.deleteTodo.bind(this));

    return router;
  }

  /** Retrieves all todos. */
  private async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const todos = await this.todosRepository.find();
      todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      res.json(todos);
    } catch (err) {
      next(err);
    }
  }

  /** Retrieves a todo by id. */
  private async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await this.todosRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });

      if (!todo) {
        res.sendStatus(404);
        return;
      }

      res.json(todo);
    } catch (err) {
      next(err);
    }
  }

  /** Creates a new todo from the request body. */
  private async createTodo(
    req: TypedRequest<CreateTodoData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todo = new Todo();
      todo.title = req.body.title;
      todo.description = req.body.description;

      const createdTodo = await this.todosRepository.save(todo);

      res.json(createdTodo).status(201);
    } catch (err) {
      next(err);
    }
  }

  /** Partially updates an existing todo with the request body data. */
  private async updateTodo(
    req: TypedRequest<UpdateTodoData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);

      await this.todosRepository.update(
        { id },
        {
          // NOTE: req.body is validated at this point
          ...req.body,
        }
      );

      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  /** Deletes a todo by id. */
  private async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      await this.todosRepository.delete(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
