import axios from "axios";
import { env } from "../env";
const baseUrl: string = env.dev_env === 'development' ? 'http://localhost:3000' : ''; 

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

export default {
  getBlogs

};