import WebSocket from 'ws'
import mongoose, { model } from 'mongoose';
import http from 'http';
import dotenv from "dotenv-defaults"
import express from 'express';
import Message from "./models/message"
import Account from './models/account';
import {sendData, sendStatus, initData} from "./wssConnect"
import bcrypt from "bcrypt"

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res)=>console.log("mongo db connection created"))
const app = express();
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const db = mongoose.connection
const PORT = process.env.PORT || 4000

const boardcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    }) 
}

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws)
        ws.onmessage = async (byteString) => {
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            switch(task){
                case 'input': {
                    const {name, body, receiver} = payload
                    const message = new Message({name, body, receiver})
                    try {
                        await message.save()
                    } catch (e) {
                        throw new Error('Message DB save Error: ' + e)
                    }
                    // sendData(['output', [payload]], ws)
                    // sendStatus({
                    //     type: 'success',
                    //     msg: 'Message sent.'
                    // }, ws)
                    boardcastMessage(['output', [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    })
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        boardcastMessage(['cleared'], {
                            type:'info',
                            msg: 'Message cache cleared.'
                        })
                        // sendData(['cleared'], ws)
                        // sendStatus({type:'info', msg: 'Message cache cleared.'}, ws)
                    })
                    break
                }
                case 'clear account': {
                    Account.deleteMany({}, () => {
                        boardcastMessage(['account cleared'], {
                            type:'info',
                            msg: 'Account cache cleared.'
                        })
                    })
                    break
                }
                case 'sign in': {
                    const {name} = payload
                    const user = await Account.findOne({name})
                    if(user){
                        sendData(["signIn", user.password], ws)                        
                    }else{
                        sendData(["signIn", "Fail"], ws)
                        sendStatus({
                            type: 'error',
                            msg: 'User not found!'
                        }, ws)
                    }
                    break
                }
                case 'sign up': {
                    const {name, password} = payload
                    const findUser = await Account.findOne({name})
                    if (findUser){
                        sendStatus({
                            type: "error",
                            msg: "User already exists!"
                        }, ws)
                    }else{
                        const user = new Account({name, password})
                        try {
                            await user.save()
                        } catch (e) {
                            throw new Error('Message DB save Error: ' + e)
                        }
                        sendStatus({
                            type: "success",
                            msg: "User account created."
                        }, ws)
                    }
                    break
                } 
                default: break
            }
        }
    })
    server.listen(PORT, () =>{
        console.log(`Example app listening on port ${PORT}!`)
    })
})
