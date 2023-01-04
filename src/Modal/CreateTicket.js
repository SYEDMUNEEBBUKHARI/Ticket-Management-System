import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form, Input, Divider } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './createticket.scss'

const CreateTicket = ({ value, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(value || false)
  const [addToDoData, setToDoData] = useState([])
  const [description, setDescription] = useState('')

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setToDoData([])
    setIsModalOpen(false)
    close()
  }
  const onFinish = async (values) => {
    if (
      values.name == '' ||
      values.Description == '' ||
      addToDoData.length < 1
    ) {
      alert('Fields should be filled!')
    }
    let temp = values
    temp.todos = addToDoData
    temp.userId = 1
    temp.status = 'active'
    console.log('Success:', temp)
    const data = await axios.post(
      'http://localhost:8000/api/ticket/submitTicket',
      temp
    )
    console.log(data.status)
    if (data.status) {
      setIsModalOpen(false)
    } else {
      alert('Error ')
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const refineData = (d) => {
    let temp = addToDoData
    temp[d] = temp[temp.length - 1]
    temp.pop()
    setToDoData([...temp])
  }
  useEffect(() => {}, [addToDoData])
  return (
    <>
      <Modal
        title='Ticket'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name='basic'
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Name'
            name='name'
            required={true}
            rules={[
              {
                min: 3,
                message: 'write the name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='description'
            name='description'
            required={true}
            rules={[
              {
                min: 3,
                message: 'write the description!',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item label='todos' name='todos'>
            <div>
              <Input
                value={description || ''}
                name='todo description'
                onChange={(e) => {
                  setDescription(e.currentTarget.value)
                }}
              />
              {addToDoData &&
                addToDoData.map((d, k) => {
                  return (
                    <div className='todos-section' key={k}>
                      {' '}
                      <p key={k + d.description}>
                        {Number(k) + 1}
                        {')'} {d.description}
                      </p>
                      <CloseCircleOutlined
                        className='close'
                        onClick={(e) => {
                          refineData(k)
                        }}
                      />
                    </div>
                  )
                })}
              <Divider plain>***</Divider>
              <Button
                onClick={() => {
                  setToDoData((prev) => [...prev, { description, todo: false }])
                  setDescription('')
                }}
              >
                Add Todos
              </Button>
            </div>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 18,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CreateTicket
