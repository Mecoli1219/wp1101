import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import ChatRoom from "./ChatRoom"
import SignIn from './SignIn'
import useChat from '../Hooks/useChat'

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

  const {status, messages, sendMessage, clearMessages, requireSignIn, signedIn, requireSignUp, clearAccount} = useChat()
  const [body, setBody] = useState('')
  const bodyRef = useRef(null)
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

  useEffect(() => {
    displayStatus(status)}, [status]
  )

  useEffect(()=> {
    if(signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn, me])

  return (
    <Wrapper>
      {signedIn ? 
        <ChatRoom 
          messages={messages}
          clearMessages={clearMessages}
          me={me}
          bodyRef={bodyRef}
          sendMessage={sendMessage}
          displayStatus={displayStatus}
          setBody={setBody}
          body={body}
        /> :
        <SignIn
          me={me} 
          setMe={setMe}
          displayStatus={displayStatus}
          requireSignIn={requireSignIn}
          requireSignUp={requireSignUp}
          clearAccount={clearAccount}
        />
      }
    </Wrapper>
  )
}

export default App
