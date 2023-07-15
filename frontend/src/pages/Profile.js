import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { deleteUser, logout } from '../apiCalls/user'

const Profile = () => {

  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const logoutHandler = async (e) => {
    e.preventDefault()
    const response = await logout()
    if(response.status === 200) {
      alert("User Logged Out")
      setUser({})
      navigate("/user/login")
    }
    else {
      alert(response.response.data.msg)
    }
  }

  const deleteAccountHandler = async (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure you want to delete your account?")) {
      
      const response = await deleteUser()
      if(response.status === 200) {
        alert("User Account deleted!")
        setUser({})
        navigate("/user/login")
      }
      else {
        alert(response.response.data.msg)
      }
    }

  }

  return (
    <div className="w-1/4 m-auto text-center">
      <h1 className="text-3xl my-3 font-bold">Profile</h1>

      <div className='mt-3'>
        <h2 className='text-2xl'>Name: {user.name}</h2>
        <h2 className='text-2xl'>Email: {user.email}</h2>
        <h2 className='text-2xl'>Age: {user.age}</h2>
      </div>
      <div className='mt-3'>
        <button onClick={() => {navigate("/user/update")}} className='my-3 bg-yellow-600 text-white w-full py-2 rounded'>
          Update Profile
        </button>

        <button onClick={() => {navigate("/user/updatePassword")}} className='my-3 bg-blue-600 text-white w-full py-2 rounded'>
          Update Password
        </button>

        <button onClick={deleteAccountHandler} className='my-3 bg-red-400 text-white w-full py-2 rounded'>
          Delete Account
        </button>

        <button className='my-3 bg-red-700 text-white w-full py-2 rounded' onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
    </div>
  )
}

export default Profile