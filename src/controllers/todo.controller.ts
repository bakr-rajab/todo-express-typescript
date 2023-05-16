import { Request, Response } from 'express';
import { TODO, createTodo, deleteTodo, getTodo } from '../models/todo.model';


const create = async (req: Request, res: Response) => {
    // validate req by joi 
    const Todo: TODO = {
        title: req.body.title,
        body: req.body.body,
        desc: req.body.description,
        userId: res.locals.user._id
    }

    let todoDb = await createTodo(Todo)

    res.send(todoDb)
}

const getInfo = async (req: Request, res: Response) => {

    let todoDb = await getTodo(req.params.todo, res.locals.user._id)

    res.send(todoDb)
}
const deleteOne = async (req: Request, res: Response) => {

    let todoDb = await deleteTodo(req.params.todo, res.locals.user._id)

    res.send(todoDb)
}

export { create, getInfo ,deleteOne};
