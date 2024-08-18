import { ButtonGroup, Button, Table, UnstyledButton, ActionIcon, useMantineColorScheme, Group, Skeleton, TextInput, Box, Space, useMantineTheme, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import blogRoutes from '../../routes/blogRoutes';
import { IconPencil } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';

const BlogList = ({
  blogs,
  searchValue,
  isLoading
}: {
  blogs: Array<Blog>;
  searchValue?: string;
  isLoading: boolean;
}) => {
  const filteredBlogs = searchValue ? (
    blogs.filter(blog => [
      blog.title,
      blog.content,
    ].filter(x => x).join(" ").toLowerCase().includes(searchValue.toLowerCase()))
  ) : blogs;
  const theme = useMantineColorScheme();

  if (isLoading) return <Group align='center' justify='center'>
    <Loader />
  </Group>;

  if (!filteredBlogs.length) return (
    <Table.Tr>
      <Table.Td colSpan={99} ta={"center"} fz={20}>Couldn't find any blog</Table.Td>
    </Table.Tr>
  );

  return filteredBlogs.map((blog, i) => (
    <Table.Tr
      key={i}
    >
      <Table.Th>{i + 1}</Table.Th>
      <Table.Td>{blog.title}</Table.Td>
      <Table.Td>{ }</Table.Td>
      <Table.Td>
        <ActionIcon
          variant={theme.colorScheme === 'dark' ? 'light' : 'filled'}
          component={Link}
          to={blog._id}
        >
          <IconPencil />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
};

export const Page = () => {
  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    const loadBlogs = async () => {
      try {
        const response = await blogRoutes.getBlogs();
        setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
        setBlogs([]);
      } finally { setIsLoading(false); }
    };

    loadBlogs();

  }, []);

  if (blogs === undefined) {
    return (
      "Blogs couldn't loaded"
    );
  }

  return (
    <Box>
      <TextInput
        placeholder='Search...'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <Space h={30} />
      <Table>
        <Table.Thead>
          <Table.Th w={1}>#</Table.Th>
          <Table.Th w={"40%"}>Blog Title</Table.Th>
          <Table.Th w={"40%"}>Statics</Table.Th>
          <Table.Th w={0}>Edit</Table.Th>
        </Table.Thead>
        <Table.Tbody>
          <BlogList blogs={blogs} searchValue={searchValue} isLoading={isLoading} />
        </Table.Tbody>
      </Table>
    </Box>
  );
};