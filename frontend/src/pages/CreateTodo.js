import React, { useContext, useState } from 'react'
import { TodoContext } from '../Context/TodoContext'
import { useNavigate } from 'react-router-dom'
import { createTodo } from '../apiCalls/todo'

const CreateTodo = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const {todo, setTodo} = useContext(TodoContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const todo = {title, description,}
    const response = await createTodo(todo)
    if(response.status === 201) {
      alert("Todo Created Successfully!")
      navigate("/")
    }
    else {
      alert(response.response.data.msg)
    }
  }

  return (
    <div className="w-1/4 m-auto text-center">
      <h1 className="text-3xl my-3 font-bold">Create Todo</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter title..."
            className="focus:outline-none border-none p-2 rounded w-full"
            value = {title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="focus:outline-none border-none p-2 rounded w-full"
            cols="30"
            rows="5"
            value = {description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateTodo