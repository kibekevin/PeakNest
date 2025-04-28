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
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
}, {timestamps: true});




const User = mongoose.model('User', userSchema);


export default User;