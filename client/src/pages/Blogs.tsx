import { Box, Card, SimpleGrid, Space, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const getBlogs = () => {
  const [blogs, setBlogs] = useState<Array<{
    _id: any,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number;
  }>>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");

        const { data }: {
          data: Array<{
            _id: any,
            title: string,
            content: string,
            createdAt: Date,
            updatedAt: Date,
            __v: number;
          }>;
        } = response.data;

        setBlogs(data);
      } catch (error) {
        console.error(error);
        setBlogs([]);
      }
    };

    getBlogs();
  }, []);

  if (!blogs) {
    return [];
  }

  return blogs;
};

const Page: React.FC = () => {
  const blogs = getBlogs();
  const theme = useMantineTheme();
  const [searchValue, setSearchValue] = useState<string>("");

  let filteredBlogs = (!!searchValue ? (
    blogs.filter(blog => [
      blog.title,
      blog.content,
    ].filter(x => x).join(" ").toLowerCase().includes(searchValue.toLowerCase()))
  ) : blogs);

  return (
    <Box>
      <Title order={1} c={theme.primaryColor}>Blogs</Title>
      <Space h={10} />
      <TextInput
        placeholder="Search Blogs..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        mb={20}
      />

      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        {filteredBlogs.map((blog, i) => (
          <BlogCard
            key={i}
            id={blog._id}
            title={blog.title}
            content={blog.content}
            
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Page;