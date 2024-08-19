import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../types";
import blogRoutes from "../../routes/blogRoutes";
import { Loader, Text, TextInput } from "@mantine/core";

export const Page = () => {
  const { blogId } = useParams<{ blogId: string; }>();
  const [blog, setBlog] = useState<Blog>();
  
  useEffect(() => {
  async function loadBlog() {
    try {
      const response = await blogRoutes.getBlogById(blogId);
      if (response.data.success === 'false') {
        return;
      } else {
        setBlog(response.data.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }
    
    loadBlog();
  }, []);
  
  if (!blog) return <Loader />;
  
  return (
  <form action="">
    <TextInput value={blog.title} />
    <Text>{blog.image}</Text>
  </form>
  );
};