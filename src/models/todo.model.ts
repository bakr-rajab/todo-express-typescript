import mongoose, { Schema, model, ObjectId } from 'mongoose';

interface TODO {
    _id?: ObjectId;
    title: string;
    body?: string;
    desc?: string;
    // status: Boolean;
    userId: mongoose.Schema.Types.ObjectId
}

const todoSchema = new mongoose.Schema<TODO>({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    // status: {
    //     type: Boolean,
    // },

});


const todoModel = model<TODO>('todo', todoSchema);


const createTodo = async (todo: TODO): Promise<TODO> => {
    const newTodo = new todoModel(todo);
    await newTodo.save();
    return newTodo;
};

const insertManyTodos = async (todo: TODO[]): Promise<any> => {
    await todoModel.deleteMany({})
    const newTodo = await todoModel.insertMany(todo);
    return newTodo;
};


const getTodoById = async (_id: string): Promise<TODO | null> => {
    const todo: TODO | null = await todoModel.findOne({ _id: _id }).exec();
    return todo;
};

const getTodo = async (_id: string, userId: string): Promise<TODO | null> => {
    const todo: TODO | null = await todoModel.findOne({ _id: _id }).populate("userId").exec();
    return todo;
};

const deleteTodo = async (_id: string, userId: string): Promise<any> => {
    const todo = await todoModel.deleteOne({ _id: _id, userId: userId }).exec();
    return todo;
};

const getAllTodos = async (userId: string): Promise<TODO[] | null> => {
    const todos = await todoModel.find({ userId: userId }).exec();
    return todos;
};


export {
    TODO,
    createTodo,
    getTodo,
    deleteTodo,
    getTodoById,
    getAllTodos,
    insertManyTodos
};
