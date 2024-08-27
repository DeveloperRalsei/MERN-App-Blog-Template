import axios from "axios";
import { env } from "../env";
import { ObjectId } from "mongoose";
import { Blog } from "../types";
export const baseUrl: string = env.dev_env === 'development' ? 'http://localhost:3000' : ''; 

const getBlogs = async () => {
  try {
    const response = await axios.get(baseUrl + '/api/blogs');
    return response;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      status: 500,
      statusText: "Internal Server Error",
      headers: {},
      config: {},
    };
  }
};

const getBlogById = async (blogId: ObjectId | any) => {
  try {
    const response = await axios.get(baseUrl + `/api/blogs/${blogId}`)
    return response
  } catch (error) {
    console.error(error)
    return {
      data: [],
      status: 500,
      statusText: "Internal Server Error",
      header: {},
      config: {}
    }
  }
}

const newBlog = async (data: Blog | any) => {
  try {
    const response = await axios.post(`${baseUrl}/api/blogs`,data)
    return response
  } catch (error) {
    console.error(error)
    return {
      data: [],
      status: 500,
      statusText: "Internal Server Error",
      header: {},
      config: {}
    }
  }
}

export default {
  getBlogs,
  getBlogById,
  newBlog
};