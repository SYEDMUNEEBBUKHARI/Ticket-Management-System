import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Checkbox } from 'antd'
import CreateTicket from '../../Modal/CreateTicket'
import './home.scss'
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [checked, setChecked] = useState(false)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'fake result connect db to get real data',
      description: '',
      status: 'active',
      todos: [
        { todo: true, description: 'crypto bot should be integrated' },
        { todo: true, description: 'crypto bot should be integrated' },
        { todo: true, description: 'crypto bot should be integrated' },
      ],
    },
  ])

  useEffect(() => {
    getticketsData()
  }, [showModal])
  const getticketsData = async () => {
    const result = await axios.get(
      'http://localhost:8000/api/ticket/getTicketData',
      {
        params: {
          userId: 1,
        },
      }
    )
    let { data } = result
    console.log('adsdsa', data.response[0].Tickets || [])
    const tickets = data.response[0].Tickets
    setTasks(tickets)
    return data
  }
  const data = {
    active: [],
    completed: [],
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragStart = (e, id) => {
    console.log('ondragStart')
    e.dataTransfer.setData('id', id)
  }
  const onChangeCheckBox = (e, id, key) => {
    console.log('checked = ', e.target.checked, ' id', id)
    setChecked(e.target.checked)
  }
  tasks.forEach((k) => {
    data[k.status].push(
      <div
        key={k.id}
        onDragStart={(e) => onDragStart(e, k.id)}
        draggable
        className='draggable'
      >
        <h4 className='ticket-title'> Ticket Title:</h4>
        <p className='title-name'>{k.name}</p>
        <h6 className='ticket-todos'>Todos:</h6>
        {k.todos.length < 1 && 'No Data'}
        <div>
          {k.todos.map((data, key) => {
            return (
              <div className='todos-list' key={key}>
                {' '}
                <Checkbox
                  key={key}
                  onChange={(e) => onChangeCheckBox(e, k.id, key)}
                >
                  {checked}
                </Checkbox>
                {data.description}
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  const onDrop = (e, data) => {
    console.log('ondrop', tasks)

    let id = e.dataTransfer.getData('id')
    let temp = tasks.filter((task) => {
      if (task.id == id) {
        task.status = data
      }
      return task
    })
    setTasks((prev) => [...prev])
  }
  return (
    <div className='main-container'>
      <div className='content'>
        <h1 className='heading'>Ticket Management System</h1>
        <div className='tickets'>
          <div
            className='active'
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'active')}
          >
            <h3>Active</h3>
            {data.active}
          </div>
          <div
            className='droppable'
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'completed')}
          >
            {' '}
            <h3>Completed</h3>
            {data.completed}
          </div>
          <div>
            <Button onClick={() => setShowModal(true)}>Create Ticket</Button>
          </div>
          {showModal && (
            <CreateTicket value={showModal} close={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
