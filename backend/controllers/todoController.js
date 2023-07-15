import Todo from '../models/Todo.js'

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user})
        res.status(200).json({
            msg: "Todos Found", 
            todos: todos
        })
    } catch(err) {
        return res.status(500).json({
            error: err.message,
            message: "Internal Server Error"
        })
    }
}

export const getTodo = async (req, res) => {
    const {id} = req.params
    try {
        const todo = await Todo.findById(id)
        if(!todo) {
            return res.status(404).json({
                msg: "Todo Not Found!"
            })
        }
        if(todo.user.toString() !== req.user) {
            return res.status(401).json({
                msg: "Not Authorized"
            })
        }
        return res.status(200).json({
            msg: "Todo Found",
            todo: todo
        })
    }
    catch(err) {
        return res.status(500).json({
            error: err.message,
            message: "Internal Server Error"
        })
    }
}

export const createTodo = async (req, res) => {
    const {title, description} = req.body
    console.log(req.body)
    try {
        const todo = await Todo.create({
            title,
            description,
            completed: false,
            user: req.user
        })
        res.status(201).json({
            msg: "ToDo created Successfully",
            todo: todo
        })
    }
    catch(err) {
        return res.status(500).json({
            error: err.message,
            msg: "Internal Server Error, you should be reaching here!"
        })
    }
}

export const updateTodo = async (req, res) => {
    const {id} = req.params
    const {title, description, completed} = req.body
    
    try {
        const todo = await Todo.findById(id);
        if(!todo) {
            console.log("bc mila hi nahi")
            return res.status(404).json({
                msg: "Todo Not Found!"
            })
        }

        if(todo.user.toString() !== req.user) {
            return res.status(401).json({
                msg: "Not Authorized Access"
            })
        }

        todo.title = title
        todo.description = description
        todo.completed = completed
        
        await todo.save()
        res.status(200).json({
            msg: "Todo Updated Successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            msg: "Internal Server Error"
        })
    }
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params
    try {
        const todo = await Todo.findById(id);
        console.log(todo._id)
        if(!todo) {
            return res.status(404).json({
                msg: "Todo Not Found!"
            })
        }

        if(todo.user.toString() !== req.user) {
            return res.status(401).json({
                msg: "Not Authorized Access"
            })
        }

        await todo.deleteOne()
        res.status(200).json({
            msg: "Todo Removed Successfully!"
        })
    }
    catch(err) {
        console.log("AM I HERE?")
        res.status(500).json({
            error: err.message,
            msg: "Internal Server Error"
        })
    }
}