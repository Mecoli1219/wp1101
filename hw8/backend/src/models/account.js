import mongoose from "mongoose"

const Schema = mongoose.Schema
const AccountSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.']
    }
})

const Account = mongoose.model('account', AccountSchema)
export default Account