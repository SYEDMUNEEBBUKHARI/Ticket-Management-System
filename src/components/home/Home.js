import React, { useState } from 'react'
import './home.scss'
const Home = () => {
  const [tasks, setTasks] = useState([
    { name: 'create assessment', description: '' },
    { name: 'create backend', description: '' },
  ])
  return (
    <div className='main-container'>
      <div className='content'>
        <h1 className='heading'>Ticket Management System</h1>
      </div>
      Home
    </div>
  )
}
export default Home
