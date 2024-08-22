import { ButtonGroup, Button, Table, UnstyledButton, ActionIcon, useMantineColorScheme, Group, Skeleton, TextInput, Box, Space, useMantineTheme, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import blogRoutes from '../../routes/blogRoutes';
import { IconPencil } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';
import { useDebouncedValue } from '@mantine/hooks';
import { nprogress } from '@mantine/nprogress';

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

  if(filteredBlogs.length === 0) return <Table.Tr>
    <Table.Td colSpan={300} ta={"center"}>
      Couldn't find any blogs 
    </Table.Td>
  </Table.Tr>

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
  const [debounced] = useDebouncedValue(searchValue, 125);

  useEffect(() => {

    const loadBlogs = async () => {
      nprogress.start();
      try {
        const response = await blogRoutes.getBlogs();
        setBlogs(response.data.data);
        nprogress.complete();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        nprogress.reset();
        setBlogs([]);
      }
    };

    loadBlogs();

  }, []);

  return (
    <>
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
          {blogs !== undefined ? (
            <BlogList blogs={blogs} searchValue={debounced} isLoading={isLoading} />
          ) : (
            <Table.Tr><Table.Td colSpan={88} ta={"center"}>Couldn't load blogs, please try to refresh page</Table.Td></Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </>
  );
};