import React from 'react'
import TodoList from './TodoList'
import { TodoContext } from '../Context/TodoContext'

const LoggedInHome = ({name}) => {
  
  return (
    <div className='w-5/6 m-auto text-center'>
      <h1 className='text-center text-3xl mb-4 mt-4'>Welcome, {name}.</h1>
      <TodoList/>
    </div>
  )
}

export default LoggedInHome