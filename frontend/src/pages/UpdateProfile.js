import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { updateUser } from '../apiCalls/user'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const {user, setUser} = useContext(UserContext)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            name, email, age
        }

        const response = await updateUser(data)
        if(response.status === 200) {
            alert("User Updated SuccessFully")
            setUser(response.data.user)
            navigate("/user/profile")
        }
        else {
            alert(response.response.data.msg)
        }
    }

    return (
        <div className="w-1/4 m-auto text-center">
          <h1 className="text-3xl my-3 font-bold">Register</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter Name..."
                className="focus:outline-none border-none p-2 rounded w-full"
                value = {name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Enter Email..."
                className="focus:outline-none border-none p-2 rounded w-full"
                value = {email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter Age..."
                className="focus:outline-none border-none p-2 rounded w-full"
                value = {age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded"
            >
              Update
            </button>
          </form>
        </div>
    )
}

export default UpdateProfile