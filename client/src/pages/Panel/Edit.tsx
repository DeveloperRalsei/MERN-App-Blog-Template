import { Box, Button, Card, Divider, FileInput, Image, Input, Loader, Modal, Paper, SimpleGrid, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Blog } from "../../types";
import blogRoutes from "../../routes/blogRoutes";
import { useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { } from '@mantine/tiptap';
import TextEditor from "./panelComps/TextEditor";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconNotebook } from "@tabler/icons-react";

export const Page = () => {

  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpened, { close, open }] = useDisclosure();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: blog?.title || "",
      content: blog?.content || ""
    }
  });

  useEffect(() => {

    async function loadBlog() {
      try {

        setIsLoading(true);
        const response = await blogRoutes.getBlogById(blogId);
        const data = response.data.data[0];
        setBlog(data);

      } catch (error) {

        setIsLoading(false);
        console.error(error as string);

      } finally {
        setIsLoading(false);
      }
    }

    loadBlog();
  }, []);

  useEffect(() => {
    if (blog) {
      form.setFieldValue("title", blog.title);
    }

  }, [blog, form]);

  if (isLoading || !blog) return <Loader />;

  return (

    <form onSubmit={form.onSubmit(values => console.log(values))}>
      <Title order={3}>
        Editing {'"' + blog?.title + '"'}
      </Title>
      <Divider my={10} />
      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        <Paper>
          <Image src={blog?.image} alt={"blogImage-" + blog?._id} />
        </Paper>
        <Box >

          <TextInput
            withAsterisk
            label="Blog Title"
            mb={30}
            rightSection={<IconBook />}
            {...form.getInputProps("title")}
          />

          <FileInput
            label="Content"
            onClick={() => open()}
            placeholder="Change Content"
            rightSection={<IconNotebook />}
            style={{ cursor: "pointer" }}
          />

          <Modal
            opened={modalOpened}
            onClose={close}
            title="Content"
            size={"xl"}
            closeOnClickOutside={false}
            closeOnEscape={false}
          >

            <TextEditor content={blog.content} />
          </Modal>
        </Box>
      </SimpleGrid>
    </form>

  );
};