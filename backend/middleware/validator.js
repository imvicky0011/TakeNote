import {check} from 'express-validator'

export const registerRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Entered password does not follow the semantics").isLength({min: 6}),
    check("age", "Age is required").notEmpty().trim().isNumeric() 
]

export const loginRules = [
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Entered password does not follow the semantics").isLength({min: 6}),
]

export const updateDetailsRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("age", "Age is required").notEmpty().trim().isNumeric() 
]

export const updatePasswordRules = [
    check("password", "Entered password does not follow the semantics").isLength({min: 6}),
    check("newPassword", "Entered password does not follow the semantics").isLength({min: 6}),
]

export const createTodoRules = [
    check("title", "Title is Required").notEmpty().trim().escape(),
    check("description", "description is required").notEmpty().trim().escape(),
]

export const updateTodoRules = [
    check("title", "Title is Required").notEmpty().trim().escape(),
    check("description", "description is required").notEmpty().trim().escape(),
    check("completed", "completed is required").notEmpty().trim().escape().isBoolean()
]