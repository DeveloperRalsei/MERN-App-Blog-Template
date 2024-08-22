import { ObjectId } from "mongoose";

export type Blog = {
  _id: ObjectId | string,
  title: string,
  content: string,
  image?: string,
  author: string,
  tags: Array<string>,
  createdAt: Date,
  updatedAt: Date
};