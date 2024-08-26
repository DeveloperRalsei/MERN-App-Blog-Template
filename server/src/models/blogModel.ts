import mongoose, { Document, Schema } from "mongoose";

interface Blog extends Document {
    title: string,
    content: string,
    author: string,
    tags?: string[],
    image?: string
}

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
        type:  String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    }
}, { timestamps: true })

export default mongoose.model<Blog>("Blog", blogSchema)