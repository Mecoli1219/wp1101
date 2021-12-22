import { Input, Button, Space } from 'antd'
import {UserOutlined} from "@ant-design/icons"
import Title from "../Components/Title"
import { useState, useRef } from 'react'

const SignIn = (props) =>{

  const {
    me, setMe, displayStatus, setSignedIn
  } = props  

  return (
    <>
      <Title>
        <h2>My Chat Room<br/>I've done advance!<br/>But antd have some re-render problem<br/>You need to do some action for re-render<br/>Thanks</h2>
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
            else setSignedIn(true)
        }}
      ></Input.Search>
    </>
  )
}

export default SignIn