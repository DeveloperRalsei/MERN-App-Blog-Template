import { ButtonGroup, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import blogRoutes from '../../routes/blogRoutes';
import { IconPencil } from '@tabler/icons-react';
import { HeaderButton as Button } from '../../components/HeaderButton';

export const UploadBlog = () => {
  const [blogs, setBlogs] = useState<Array<{
    _id: any
    title: string,
    content: string,

  }>>([])

  useEffect(() => {
    
    const loadBlogs = async () => {
      try {
        const response = await blogRoutes.getBlogs()
        setBlogs(response.data.data)
        
      } catch (error) {
        
      }
    }

    loadBlogs()

  },[])

  return (
    <Table>
      <Table.Thead>
        <Table.Th w={1}>#</Table.Th>
        <Table.Th w={"40%"}>Blog Title</Table.Th>
        <Table.Th w={"40%"}>Statics</Table.Th>
        <Table.Th>Edit</Table.Th>
      </Table.Thead>
      <Table.Tbody>
        {
          blogs.map((blog,i) => (
            <Table.Tr key={i+blog.title}>
              <Table.Td>{i+1}</Table.Td>
              <Table.Td>{blog.title}</Table.Td>
              <Table.Td>{}</Table.Td>
              <Table.Td>
                <ButtonGroup>
                  <Button>
                    <IconPencil/>
                  </Button>
                  <Button></Button>
                </ButtonGroup>
              </Table.Td>
            </Table.Tr>
          ))
        }
      </Table.Tbody>
    </Table>
  );
};