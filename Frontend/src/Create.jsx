import React, { useState } from 'react'
import axios from 'axios'
function Create() {
  const [task , setTask] = useState();
  const handleAdd = () => {
    axios.post('http://localhost:3001/add' , {task : task})
    .then(res => {
      location.reload();
    }).catch(err => console.log(err)
    )
  }


  return (
    <div className='flex gap-3'>
      <input type="text" name="" placeholder='Please Enter something' onChange={(e) => setTask(e.target.value)} className='px-5 ' id="" />
      <button type="button" className='bg-blue-500 px-9 py-1 rounded-lg' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
