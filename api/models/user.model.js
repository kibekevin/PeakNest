import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 3
    }
}, {timestamps: true});




const User = mongoose.model('User', userSchema);


export default User;