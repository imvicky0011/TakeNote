import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (

  <div className="w-1/2 m-auto text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
      <div className="p-5">
          <>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy, Note taking App</h5>
          </>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the safe and robust way to maintain your daily todos, and browse through the tasks you prioritize to complete.</p>
          <button
          type="submit"
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold w-full py-2 rounded"
          onClick={() => navigate("/user/login")}
          >
          Proceed to Login
        </button>

        <button
          type="submit"
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold w-full py-2 rounded mt-10"
          onClick={() => navigate("/user/register")}
          >
          Not already associated with us? <br/> Create a new Account.
        </button>
      </div>
  </div>

  )
}

export default Home