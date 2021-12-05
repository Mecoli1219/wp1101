import { Button, Input, Typography, Tabs, Space } from 'antd'
import Title from "../Components/Title"
import Message from "../Components/Message"
import {useState, useRef} from "react"
import AddModal from './AddModal'

const {Paragraph} = Typography

const {TabPane} = Tabs

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value + 1); // update the state to force render
}

const ChatRoom = (props) =>{
  const [key, setKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const addRef = useRef()
  const [panes, setPanes] = useState([])
  const [inChatBox, setInChatBox] = useState(false)
  const forceUpdate = useForceUpdate();

  const {
    messages, 
    clearMessages, 
    me, 
    bodyRef, 
    sendMessage, 
    displayStatus, 
    setBody,
    body
  } = props

  const handleTabsOnChange = (key) => {
    setKey(key)
    setInChatBox(true)
  }

  const handleTabsEdit = (targetKey, action)=> {
    if (action === "remove") {
      remove(targetKey);
      forceUpdate()
    } else if (action === "add") {
      add();
    }
  }

  const add = ()=> {
    setVisible(true)
  }

  const remove = (targetKey) => {
    let newPanes = panes
    let nextKey = key
    newPanes.splice(targetKey, 1)
    if (targetKey === key){
      nextKey = 0;
      setInChatBox(false)
    }
    setKey(nextKey)
    setPanes(newPanes)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleCreate = () => {
    setVisible(false)
    const name = addRef.current.state.value
    addRef.current.state.value = ""
    if (name.trim() === "" || !name){
      displayStatus({
        type: "error",
        msg: "Please enter a valid username."
      })
      return
    }
    if (panes.includes(name.trim())){
      displayStatus({
        type: "error",
        msg: "You have a chatbox already."
      })
      return
    }
    const nextKey = panes.length;
    setInChatBox(false)
    setPanes([...panes, name])
    setKey(nextKey)
  }
  

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={()=>{
          clearMessages(); 
          displayStatus({
            type: "success",
            msg: "clear DB"
          })
        }}>
          Clear
        </Button>
      </Title>
      <Message>
        <Tabs
          type="editable-card"
          onChange={handleTabsOnChange}
          activeKey={key}
          onEdit={handleTabsEdit}
        >{panes.map((name, i) => (
          <TabPane tab={name} key={i} closable={true} style={{ height: "200px", overflow: "auto" }}>
          
          {messages.length === 0 ? (
            <p style={{ color: '#ccc' }}>
              No messages...
            </p>
          ) : (
            messages.map(({name, body, receiver}, i) => {
              return name===me && receiver===panes[key] ?
              <p className="App-message" key = {i} align="right" >
                <Space align="end">
                
                  <Paragraph type="secondary" ellipsis={{rows: 1000}} style={{maxWidth: "200px", margin:"0", borderRadius:"5px", backgroundColor: "#bbbbbb", padding: "0 5px", textAlign:"left"}}  >{body}</Paragraph>
                {name}
                </Space>
              </p> :
              (name===panes[key] && receiver===me ?
              <p className="App-message" key = {i} >
                <Space align="end">
                {name}  <Paragraph type="secondary" ellipsis={{rows: 1000}} style={{maxWidth: "200px", margin:"0", borderRadius:"5px", backgroundColor: "#0000ff66", color: "white", padding: "0 5px", textAlign:"left"}}>{body}</Paragraph>
                </Space>
              </p> :
              (name===me && receiver===me && panes[key]===me ?
              <p className="App-message" key = {i} >
                <Space align="end">
                
                  <Paragraph type="secondary" ellipsis={{rows: 1000}} style={{maxWidth: "200px", margin:"0", borderRadius:"5px", backgroundColor: "#bbbbbb", padding: "0 5px", textAlign:"left"}}  >{body}</Paragraph>
                {name}
                </Space>
              </p> :
              <></>
              )
              )
            })
          )}
          </TabPane>
        ))}
        </Tabs>
      </Message>
      <Input.Search
        ref = {bodyRef}
        value={body}
        onChange={(e)=> setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg)=>{
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body."
            })
            return
          }
          if (!inChatBox){
            displayStatus({
              type: "error",
              msg: "Please open a chatbox."
            })
            return
          }
          sendMessage({name: me, body: msg, receiver: panes[key]})
          setBody('')
        }}
      ></Input.Search>
      <AddModal
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
        inputRef={addRef}
      />

    </>
  )
}

export default ChatRoom
