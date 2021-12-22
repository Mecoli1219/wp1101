import mongoose, { model } from 'mongoose';
import dotenv from "dotenv-defaults"

export default () => {
    dotenv.config();

    mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res)=>console.log("mongo db connection created"))
    const db = mongoose.connection

    db.once('open', () => {
        
    })
}