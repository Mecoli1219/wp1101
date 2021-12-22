import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import {useQuery, useMutation} from "@apollo/react-hooks";
// import {}
import ChatRoom from "./ChatRoom"
import SignIn from './SignIn'

const LOCALSTORAGE_KEY = "save-me";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

  const [signedIn, setSignedIn] = useState(false)
  const [me, setMe] = useState(savedMe || "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const {type, msg} = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type){
        case "success":
          message.success(content)
          break
        case "error":
          message.error(content)
          break
        default: break
      }
    }
  }

  useEffect(()=> {
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn, me])

  return (
    <Wrapper>
      {signedIn ? 
        <ChatRoom 
          me={me}
          displayStatus={displayStatus}
        /> :
        <SignIn
          me={me} 
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      }
    </Wrapper>
  )
}

export default App
