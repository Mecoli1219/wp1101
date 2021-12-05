import { useState } from "react";
import bcrypt from "bcryptjs"

const saltRounds = 10;

const client = new WebSocket('ws://localhost:4000')
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false)
    const [passwordCache, setPasswordCache] = useState("")

    client.onmessage = async (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case "init": {
                setMessages(()=> payload)
                break
            }
            case "output": {
                setMessages(()=>[...messages, ...payload])
                break
            }
            case "status": {
                setStatus(payload)
                break
            }
            case "cleared": {
                setMessages([])
                break
            }
            case "account cleared": {
                break
            }
            case "signIn": {
                if (payload !== "Fail"){
                    const check = await bcrypt.compare(passwordCache, payload)
                    if (check){
                        setSignedIn(true)
                        setPasswordCache("")
                        setStatus({
                            type: 'success',
                            msg: 'Log In.'
                        })
                    }else{
                        setSignedIn(false)
                        setStatus({
                            type: 'error',
                            msg: 'Wrong password!'
                        })
                    }
                }else{
                    setSignedIn(false)
                }
                break
            }
            default: break
        }
    }
    const sendMessage = (payload) => {
        sendData(['input', payload]);
    }
    const sendData = async (data) =>{
        await client.send(
            JSON.stringify(data)
        )
    }
    const clearMessages = () => {
        sendData(["clear"])
    }
    const clearAccount = () => {
        sendData(["clear account"])
    }

    const hashPassword = async (password) => {
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    }

    const requireSignIn = async (me, password) => {
        sendData(['sign in', {name: me}])
        setPasswordCache(password)
    }

    const requireSignUp = async(me, password) => {
        const hash = await hashPassword(password)
        sendData(['sign up', {name: me, password: hash}])
    }

    return{
        status,
        messages,
        sendMessage,
        clearMessages,
        requireSignIn,
        signedIn,
        requireSignUp,
        clearAccount
    }
}

export default useChat;