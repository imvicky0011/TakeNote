import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LoggedInHome from './pages/LoggedInHome';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import { getUser } from './apiCalls/user';
import ProtectedRoutes from './components/ProtectedRoutes';
import UnProtectedRoutes from './components/UnProtectedRoutes';
import CreateTodo from './pages/CreateTodo';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import UpdateTodo from './pages/UpdateTodo';
import ViewTodo from './pages/ViewTodo';

function App() {
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser()
      if(res.status === 200) {
        setUser(res.data.user)
      }
      else setUser({})
    }
    fetchData()
  }, [])

  return (
    <div className="App bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <Navbar user = {user} />
      <Routes>
        <Route path = "/" element = { user._id ? <LoggedInHome name = {user.name} /> : <Home/>} />

        <Route path = "/user/register" element = {
          <UnProtectedRoutes loggenId={user._id} children={<Register/>}/>
        } />
        
        <Route path = "/user/login" element = {
          <UnProtectedRoutes loggenId={user._id} children={<Login/> }/>
        } />
        
        <Route path = "/user/profile" element = {
          <ProtectedRoutes loggedIn={user._id} children={<Profile/>} />
         } />

        <Route path = "/user/update" element = {
          <ProtectedRoutes loggedIn={user._id} children={<UpdateProfile/>} />
         } />

        <Route path = "/user/updatePassword" element = {
          <ProtectedRoutes loggedIn={user._id} children={<UpdatePassword/>} />
         } />

        <Route path = "/todo/create" element = {
          <ProtectedRoutes loggedIn={user._id} children={<CreateTodo/>} />
         } />

        <Route path = "/todo/view/:id" element = {
          <ProtectedRoutes loggedIn={user._id} children={<ViewTodo/>} />
         } />

        <Route path = "/todo/update/:id" element = {
          <ProtectedRoutes loggedIn={user._id} children={<UpdateTodo/>} />
         } />
      
      </Routes>
    
    </div>
  );
}

export default App;
