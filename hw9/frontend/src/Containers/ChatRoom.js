import { Input, Tabs, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {useMutation} from "@apollo/react-hooks";
import Title from "../Components/Title"
import Message from "../Components/Message"
import {useState, useRef} from "react"
import AddModal from './AddModal'
import ChatBox from "./ChatBox"
import useChatBox from "../Hook/useChatBox"
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from '../graphql';


const {TabPane} = Tabs

const ChatRoom = (props) =>{
  const {
    chatBoxes,
    unseen,
    setUnseen,
    checkout,
    setCheckout,
    createChatBox,
    removeChatBox
  } = useChatBox()

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const [key, setKey] = useState("")
  const [visible, setVisible] = useState(false)
  const addRef = useRef()
  const [inChatBox, setInChatBox] = useState(false)
  const [message, setMessage] = useState("")

  const {
    me, 
    displayStatus, 
  } = props

  const handleTabsOnChange = (key) => {
    const newUnseen = unseen;
    newUnseen[key] = 0
    setUnseen(newUnseen)
    setKey(key)
    setCheckout(key)
    setInChatBox(true)
  }

  const handleTabsEdit = (targetKey, action)=> {
    if (action === "remove") {
      remove(targetKey, key);
    } else if (action === "add") {
      add();
    }
  }

  const add = ()=> {
    setVisible(true)
  }

  const remove = (targetKey, key) => {
    removeChatBox(targetKey)
    if (targetKey === key){
      setInChatBox(false)
      setKey("")
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleCreate = async() => {
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
    if (chatBoxes.includes(name.trim())){
      displayStatus({
        type: "error",
        msg: "You have a chatbox already."
      })
      return
    }
    await startChat({
      variables:{
        name1: me,
        name2: name,
      }
    })
    setInChatBox(true)
    // setCheckout(name)
    createChatBox(name)
    setKey(name)
  }
  
  const handleAddUnseen = (sender) => {
    console.log(me, sender, checkout);
    if (me !== sender){
      const newUnseen = unseen;
      newUnseen[sender] += 1;
      setUnseen(newUnseen)
    }
  }

  const handleTabsClick = (name) => {
    setCheckout(name)
  }

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
      </Title>
      <Message>
        <Tabs
          tabBarStyle={{height: "36px"}}
          type="editable-card"
          onChange={handleTabsOnChange}
          activeKey={key}
          onEdit={handleTabsEdit}
          onTabClick={handleTabsClick}
        >{chatBoxes.map((name, i) => (
          <TabPane tab={<Badge count={unseen[name] || 0} offset={[25, 0]} size="small">{name}</Badge>} key={name} closable={true} style={{ height: "200px", overflow: "auto" }}>
            <ChatBox me={me} key={name} friend={name} handleAddUnseen={handleAddUnseen} nowKey={key} />
          </TabPane>
        ))}
        </Tabs>
      </Message>
      <Input.Search
        value={message}
        onChange={(e)=> {
          const newUnseen = unseen;
          newUnseen[key] = 0
          setUnseen(newUnseen)
          setMessage(e.target.value)
        }}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg)=>{
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a message."
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
          sendMessage({
            variables:{
              sender: me, 
              receiver: key,
              body: message
            }
          })
          setMessage('')
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
