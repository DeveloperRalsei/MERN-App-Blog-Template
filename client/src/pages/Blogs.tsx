import { Box, Card, Image, SimpleGrid, Skeleton, Space, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import blogRoutes from "../routes/blogRoutes";
import { Blog } from "../types";

const getBlogs = () => {
  const [blogs, setBlogs] = useState<Array<Blog>>([]);

  useEffect(() => {
    blogRoutes.getBlogs()
      .then((response) => {

        setBlogs(response.data.data || []);
        console.log(response);

      }).catch((err) => {

        console.error(err);

      });

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

      {filteredBlogs.length > 0 ? (
        <SimpleGrid cols={{ md: 2, sm: 1 }} >
          {filteredBlogs.map((blog, i) => (
            <BlogCard
              key={i}
              id={blog._id}
              title={blog.title}
              content={blog.content}
              
              image={blog.image ? (
                <Image src={"/images/personal_pp.png"} alt={`blog-image-${blog._id}`} w={"100%"} mah={175} bgp={"center"} />
              ): (
                <Skeleton w={"100%"} h={175}/>
              )}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text c={theme.primaryColor} ta={"center"}>
          Couldn't find any blogs
        </Text>
      )}
    </Box>
  );
};

export default Page;