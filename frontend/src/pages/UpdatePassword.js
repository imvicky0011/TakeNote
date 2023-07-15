import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { updatepassword } from '../apiCalls/user'

const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        if(newPassword !== confirmNewPassword) {
          alert("New password did not match!")
          return
        }

        const data = {
          password, newPassword
        }

        const response = await updatepassword(data)
        if(response.status === 200) {
          navigate("/user/profile")
          alert("Password Updated SuccessFully")
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
            type="password"
            placeholder="Enter Old Password..."
            className="focus:outline-none border-none p-2 rounded w-full"
            value = {password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Enter New Password..."
            className="focus:outline-none border-none p-2 rounded w-full"
            value = {newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <input
            type="password"
            placeholder="Confirm New Password..."
            className="focus:outline-none border-none p-2 rounded w-full"
            value = {confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword