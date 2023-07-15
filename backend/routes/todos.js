import express from 'express'
import authorize from '../middleware/auth.js'
import {getTodos, getTodo, createTodo, updateTodo, deleteTodo} from '../controllers/todoController.js'
import { createTodoRules, updateTodoRules } from '../middleware/validator.js'
import { validateResults } from '../middleware/validationResults.js'
const router = express.Router()

router.get("/:id", authorize, getTodo)

router.get("/", authorize, getTodos)

router.post("/create", authorize, createTodoRules, validateResults, createTodo)

router.put("/update/:id", authorize, updateTodoRules, validateResults, updateTodo)

router.delete("/delete/:id", authorize, deleteTodo)

export default router;