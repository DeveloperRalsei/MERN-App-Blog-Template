import axios from "axios";
const url: string = 'http://localhost:3000';

const getBlogs = async () => {
  try {
    const response = await axios.get(url ? url + '/api/blogs' : '/api/blogs');
    return response;
  } catch (error) {
    console.error(error)
    return []
  }
};

export default {
  getBlogs

};