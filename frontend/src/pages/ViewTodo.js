import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../Context/TodoContext'
import axios from 'axios'

const ViewTodo = () => {
    const [todo, setTodo] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/todos/${id}`)
            if(response.status === 200) {
                console.log(response)
                setTodo(response.data.todo)
            }
            else {
                alert(response.response.data.msg)
                navigate("/")
            }
        }   
        fetchData()     
    }, [])
    return (
    <div className='mt-10 text-center bg-white w-3/4 m-auto rounded py-3'>
        {
            todo && <div>
                <h1 className='text-3xl mt-4 font-bold'>:: {todo.title} ::</h1>
                <h2 className='mt-3 text-2xl'>Status: <span className='bg-blue-500 text-white w-full py-1 rounded'> {todo.completed ? "Completed" : "Not Completed"} </span> </h2>
                <p className='mt-3'>Description: {todo.description}</p>
                <p className='mt-3'>Created: {todo.createdAt}</p>
                <p className='mt-3'>Updated: {todo.updatedAt}</p>
                <button onClick={() => navigate("/")} className='bg-blue-500 mt-4 text-white w-40 py-1 rounded'>Browse Entire List</button>
            </div>
        }
    </div>
  )
}

export default ViewTodo