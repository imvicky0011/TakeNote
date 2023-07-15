import React, { useContext } from "react";
import { deleteTodo } from "../apiCalls/todo";
import { TodoContext, TodoContextProvider } from "../Context/TodoContext";
import { useNavigate } from "react-router-dom";

const TodoItems = ({ item }) => {
  const { todo, setTodo } = useContext(TodoContext);
  const navigate = useNavigate()
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure, you want to delete this ToDo?")) {
      const response = await deleteTodo(item._id);
      console.log(item._id);
      if (response.status === 200) {
        const updatedTodo = todo.filter(
          (temp_item) => item._id !== temp_item._id
        );
        setTodo(updatedTodo);
      } else {
        // Handle error, if any
        alert(response.response.data.msg);
      }
    }
  }

  return (
    <tr>
      <td className="border px-4 py-2">{item.title}</td>
      <td className="border px-4 py-2">{item.description}</td>
      <td className="border px-4 py-2">
        {item.completed ? "Completed" : "Not Completed"}
      </td>

      <td className="border px-4 py-2">
        <button 
        className="bg-blue-600 text-white px-2 rounded"
        onClick={() => navigate(`/todo/view/${item._id}`)}
        >
        View</button>
      </td>
      
      <td className="border px-4 py-2">
        <button 
        className="bg-green-600 text-white px-2 rounded"
        onClick={() => {navigate(`/todo/update/${item._id}`)}}
        >
        Update</button>
      </td>

      <td className="border px-4 py-2">
        <button
          className="bg-red-600 text-white px-2 rounded"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
