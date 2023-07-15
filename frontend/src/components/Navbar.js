import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-black py-3 text-white flex justify-between items-center">
      <h1 className="ml-1 font-bold text-2xl">ToDo App</h1>
      <ul className="flex">
        {user._id && (
          <>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/">
                Home
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="/todo/create">
                Create Todo
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="user/profile">
                Profile
              </Link>
            </li>
          </>
        )}

        {!user._id && (
          <>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="user/register">
                Register
              </Link>
            </li>
            <li className="mr-3">
              <Link className="hover:text-pink-500" to="user/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
