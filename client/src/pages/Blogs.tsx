import { Group, Loader, SimpleGrid, Space, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import blogRoutes from "../routes/blogRoutes";
import { Blog } from "../types";
import { nprogress } from "@mantine/nprogress";

const BlogList = ({
  blogs,
  searchValue,
}: {
  blogs: Array<Blog>;
  searchValue: string;
}) => {
  const theme = useMantineTheme();

  const filteredBlogs = searchValue
    ? blogs.filter((blog) =>
      [blog.title, blog.content, blog.tags]
        .filter((x) => x)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    : blogs;

  if (!blogs) {
    return <Group
      align="center"
      justify="center"
    >
      <Loader
        type="bars"
        size={"lg"}
      />
    </Group>;
  }

  return filteredBlogs.length > 0 ? (
    <SimpleGrid cols={{ md: 2, sm: 1 }}>
      {filteredBlogs.map((blog, i) => (
        <BlogCard
          key={i}
          _id={blog._id}
          title={blog.title}
          content={blog.content}
          image={blog.image}
          author={blog.author}
          tags={blog.tags}
        />
      ))}
    </SimpleGrid>
  ) : (
    <Text c={theme.primaryColor} ta={"center"}>
      Couldn't find any blogs 😭
    </Text>
  );
};

const Page: React.FC = () => {
  const theme = useMantineTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  useEffect(() => {

    const loadBlogs = async () => {
      if (!isCancelled) {
        nprogress.start();
        try {
          const response = await blogRoutes.getBlogs();
          setBlogs(response.data.data || []);
          nprogress.complete();
          console.log(response)
        } catch (error) {
          nprogress.reset();
          console.error(error);
        }
      }
    };

    loadBlogs();

    return () => setIsCancelled(true)
  }, []);

  return (
    <>
      <Title order={1} c={theme.primaryColor}>
        Blogs
      </Title>
      <Space h={10} />
      <TextInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        mb={15}
        placeholder="Search..."
      />
      <BlogList blogs={blogs} searchValue={searchValue} />
    </>
  );
};

export default Page;
