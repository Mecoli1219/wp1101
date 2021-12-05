import { Input, Button, Space } from 'antd'
import {UserOutlined} from "@ant-design/icons"
import Title from "../Components/Title"
import { useState, useRef } from 'react'
import SignUpModal from './SignUpModal'

const SignIn = (props) =>{

  const {
    me, setMe, displayStatus, requireSignIn, requireSignUp, clearAccount
  } = props  
  
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const nameRef = useRef()
  const passwordRef = useRef()

  const handleOnClick = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSignUp = () => {
    setVisible(false)
    const name = nameRef.current.state.value
    const password = passwordRef.current.state.value || ""
    nameRef.current.state.value = ""
    passwordRef.current.state.value = ""
    if (name.trim() === "" || !name){
      displayStatus({
        type: "error",
        msg: "Please enter a valid username."
      })
      return
    }
    requireSignUp(name, password)
  }

  return (
    <>
      <Title>
        <h1>My Chat Room</h1>
        <Space>
          <Button type="secondary" onClick={handleOnClick}>
            Sign Up
          </Button> 
          <Button type="primary" danger onClick={()=>{
            clearAccount(); 
            displayStatus({
              type: "success",
              msg: "clear Account"
            })
          }}>
            Clear
          </Button>
        </Space>
      </Title>
      <Input.Search
        prefix={<UserOutlined />}
        value={me} 
        onChange={(e)=> setMe(e.target.value)}
        enterButton="Sign In"
        placeholder="Enter your name"
        onSearch={(name)=>{
            if (!name) 
                displayStatus({
                    type: "error",
                    msg: "Missing user name"
                })
            else requireSignIn(me, password)
        }}
      ></Input.Search>
      <Input.Password
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}
        placeholder="password"
      />
      <SignUpModal
        visible={visible}
        onCancel={handleCancel}
        onSignUp={handleSignUp}
        nameRef={nameRef}
        passwordRef={passwordRef}
      />
    </>
  )
}

export default SignIn