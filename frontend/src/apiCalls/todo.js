import axios from "axios"

export const getTodos = async () => {
    try {
        const res = await axios.get("/todos/")
        return res
    }
    catch (err) {
        return err
    }
}

export const getTodo = async (id) => {
    try {
        const res = await axios.get(`/todos/${id}`)
        return res
    }
    catch (err) {
        return err
    }
}

export const updateTodo = async (id, todo) => {
    try {
        const res = await axios.put(`/todos/update/${id}`, todo)
        return res
    }
    catch (err) {
        return err
    }
}

export const createTodo = async (todo) => {
    try {
        const res = await axios.post("/todos/create/", todo)
        return res
    }
    catch (err) {
        return err
    }
}

export const deleteTodo = async (id) => {
    try {
        const res = await axios.delete(`/todos/delete/${id}`)
        return res
    }
    catch (err) {
        return err
    }
}
