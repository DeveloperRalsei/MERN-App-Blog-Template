import { Box, Card, SimpleGrid, Space, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
        const response = await axios.get("http://localhost:3000/api/blogs");

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
  const [searchValue, setSearchValue] = useState<string>("")

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

      <SimpleGrid cols={{ md: 4, sm: 2 }}>
        {blogs.map((blog, i) => (
          <Card shadow="md" p={"md"}>
            <Text>{blog.title}</Text>
            <Text>{blog.content}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Page;