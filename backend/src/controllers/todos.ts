import { Request, Response, Router } from "express";
import { Repository } from "typeorm";
import { Todo } from "../entity/todo";

/** Todos resource HTTP controller. */
export class TodosController {
    constructor(private readonly todosRepository: Repository<Todo>) {}

    /** Creates an express router for todos resource. */
    router() {
        const router = Router();
        router.get("/", this.getAll.bind(this));
        router.get("/:id", this.getById.bind(this));
        router.post("/", this.createTodo.bind(this));
        router.delete("/:id", this.deleteTodo.bind(this));

        return router;
    }

    /** Retrieves all todos. */
    private async getAll(_: Request, res: Response) {
        const todos = await this.todosRepository.find();
        res.json(todos);
    }

    /** Retrieves a todo by id. */
    private async getById(req: Request, res: Response) {
        const todo = await this.todosRepository.findOne({
            where: { id: parseInt(req.params.id) },
        });

        res.json(todo);
    }

    /** Creates a new todo from the request body. */
    private async createTodo(req: Request, res: Response) {
        const todo = new Todo();
        console.log(req.body);

        todo.title = req.body.title;
        todo.description = req.body.description;

        const createdTodo = await this.todosRepository.save(todo);
        res.json(createdTodo).status(201);
    }

    /** Deletes a todo by id. */
    private async deleteTodo(req: Request, res: Response) {
        await this.todosRepository.delete(req.params.id);
        res.status(200).send();
    }
}
