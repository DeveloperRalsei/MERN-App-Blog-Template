import mongoose, { Schema } from "mongoose";

const blogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true })

export default mongoose.model("Blog", blogSchema)