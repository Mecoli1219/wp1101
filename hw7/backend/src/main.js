import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv-defaults"
import api from "./routes/index.js"

dotenv.config()
const port = process.env.PORT || 4000

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res)=>console.log("mongo db connection created"))

const db = mongoose.connection
db.on("error", (err)=> console.log(err))
db.once("open", async() => {
    
    const app = express()

    app.use(bodyParser.json())

    app.use(cors())
    
    app.use('/api', api)
    
    app.listen(port, () =>{
        console.log(`Example app listening on port ${port}!`)
    })
})

