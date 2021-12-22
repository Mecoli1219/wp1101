import {useQuery} from "@apollo/react-hooks";
import { Typography, Space } from 'antd'
import { useEffect, useRef } from "react";
import Messages from "../Components/Messages"
import { CHATBOX_QUERY } from "../graphql"
import { CHATBOX_SUBSCRIPTION } from "../graphql";

const {Paragraph} = Typography

const ChatBox = ({me, friend, handleAddUnseen, nowKey})=> {
    const {data, loading, subscribeToMore} = useQuery(CHATBOX_QUERY, {
        variables: {name1: me, name2: friend},
    });
    const messageFooter = useRef(null)

    useEffect(()=> {
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: {
                name1: me, 
                name2: friend
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev
                const newMessage = subscriptionData.data.message.data
                handleAddUnseen(newMessage.sender.name);
                return {
                    ...prev,
                    chatbox:{
                        ...prev.chatbox,
                        messages: [...prev.chatbox.messages, newMessage]
                    }
                }
            }
        })
    }, [subscribeToMore])

    const scrollToBotton = () => {
        messageFooter.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=> {
        scrollToBotton();
    }, [data])

    if (loading) return <p>loading</p>;
    return(
        <Messages>
            {data.chatbox.messages.map(({sender: {name}, body}, i) => {
                return me===name ?
                    <p className="App-message" key = {i} align="right" >
                        <Space align="end">
                        <Paragraph type="secondary" ellipsis={{rows: 1000}} style={{maxWidth: "200px", margin:"0", borderRadius:"5px", backgroundColor: "#bbbbbb", padding: "0 5px", textAlign:"left"}}  >{body}</Paragraph>
                        {name}
                        </Space>
                    </p> :
                    <p className="App-message" key = {i} >
                        <Space align="end">
                        {name}  <Paragraph type="secondary" ellipsis={{rows: 1000}} style={{maxWidth: "200px", margin:"0", borderRadius:"5px", backgroundColor: "#0000ff66", color: "white", padding: "0 5px", textAlign:"left"}}>{body}</Paragraph>
                        </Space>
                    </p>
                })
            }
            <div ref={messageFooter} style={{height:"0px"}} />
        </Messages>
    )
}

export default ChatBox