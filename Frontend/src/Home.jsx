import React, { useEffect, useState } from 'react'
import Create from './Create';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const Home = () => {
  const [todos , setTodos] = useState([]);  
  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(res => {
      setTodos(res.data);
    }).catch(err => {console.log(err);})
  } ,[])


  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, { done: true })
    .then(res => {
      setTodos(prevTodos => 
        prevTodos.map(todo => todo._id === id ? { ...todo, done: true } : todo)
      );
    })
    .catch(err => console.log(err));
  }
  
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(res => {
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    })
    .catch(err => console.log(err));
  }
  
  return ( 
    <div className='flex justify-center items-center h-[250px]'>
    <div className='text-center'>
      <h2 className='text-2xl font-bold'>Todo List</h2>
      <Create/>
      {
        todos.length === 0 
        ? 
        <div><h2 className='text-2xl font-bold'>No Record</h2></div>
        :
        todos.map(todo => (
          <div key={todo._id} className='flex justify-between items-center bg-black mt-6  text-white text-start p-2 rounded'>
              <TiEdit onClick={() => handleEdit(todo._id)} />
              {todo.done ? <FaCheckCircle /> : <FaRegCircleCheck />}
              <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              <MdDelete onClick={() => handleDelete(todo._id)} />
          </div>
      ))
      
      }
    </div>
    </div>
  )
}

export default Home
