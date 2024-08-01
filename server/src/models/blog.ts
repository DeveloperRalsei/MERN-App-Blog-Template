import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})