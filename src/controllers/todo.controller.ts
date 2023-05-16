import { Request, Response } from 'express';
import { TODO, createTodo, deleteTodo, getAllTodos, getTodo, insertManyTodos } from '../models/todo.model';
const faker = require('faker');

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
const Seed = async (req: Request, res: Response) => {
    // // validate req by joi 
    // const Todo: TODO = {
    //     title: req.body.title,
    //     body: req.body.body,
    //     desc: req.body.description,
    //     userId: res.locals.user._id
    // }

    // let todoDb = await createTodo(Todo)
    const todos: TODO[] = []
    for (let todo = 0; todo < 20; todo++) {
        todos.push({
            title: await faker.name.findName(),
            body: await faker.name.findName(),
            desc: await faker.name.findName(),
            userId: res.locals.user._id
        });
    }
   let todoDb=await insertManyTodos(todos)
    res.send(todoDb);
}

const getInfo = async (req: Request, res: Response) => {

    let todoDb = await getTodo(req.params.todo, res.locals.user._id)

    res.send(todoDb)
}
const deleteOne = async (req: Request, res: Response) => {

    let todoDb = await deleteTodo(req.params.todo, res.locals.user._id)

    res.send(todoDb)
}

const getAll = async (req: Request, res: Response) => {

    let todoDb = await getAllTodos(res.locals.user._id)

    res.send(todoDb)
}

export { create, getInfo, deleteOne, getAll, Seed };
