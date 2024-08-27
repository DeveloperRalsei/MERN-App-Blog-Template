import { Title, Divider, SimpleGrid, Paper, Stack, FileInput, TextInput, Modal, Image, TagsInput, ButtonGroup, Button, Text, useMantineColorScheme, Alert } from "@mantine/core";
import { IconBook, IconImageInPicture, IconNotebook, IconPencil } from "@tabler/icons-react";
import TextEditor from "./panelComps/TextEditor";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Blog } from "../../types";
import blogRoutes from "../../routes/blogRoutes";
import { nprogress } from "@mantine/nprogress";

export const Page = () => {
  const { colorScheme } = useMantineColorScheme();
  const [imageRender, setImageRender] = useState<string>("");
  const [blogImage, setBlogImage] = useState<File | undefined>(undefined)
  const [modalOpened, { open, close }] = useDisclosure();
  const [alert, setAlert] = useState<{
    message?: string,
    type: 'successful' | 'error'
  }>()
  const [blog, setBlog] = useState<Blog>({
    title: "",
    content: "",
    author: ""
  });
  const [blogTags, setBlogTags] = useState<string[]>([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
      tags: [],
      author: "",
      image: ""
    } as Blog
  });

  useEffect(() => {
    form.setValues({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      tags: blogTags,
      image: blog.image
    });
  }, [blog.author, blog.title, blogTags, blog.image, blog.content]);

  const handleSaveContent = (content: string) => {
    setBlog({ title: blog.title, author: blog.author, content });
    form.setFieldValue("content", blog.content);
  };

  const handleReset = () => {

  };

  const handleSubmit = async (values: Blog) => {
    nprogress.start()
    const formData = new FormData()

    formData.append("title", values.title)
    formData.append("content", values.content)
    formData.append("author", values.author)
    values.tags?.map((tag) => {
      formData.append("tags", tag)
    })

    blogImage && formData.append("blogImage", blogImage.name)

    if(blog.content === "") {
      nprogress.cleanup()
      setAlert({
        message: "Content field is required",
        type: "error"
      })
      return
    }

    try {
      const response = await blogRoutes.newBlog(formData)
      console.log(response.data)
      setAlert({
        message: "Successfuly created a new blog",
        type: 'successful'
      })
      nprogress.complete()
    } catch (error) {
      console.error(error)
      nprogress.cleanup()
    }

  }

  return (

    <form
      onSubmit={form.onSubmit(v => handleSubmit(v))}
    >
      <Title order={3}>
        New Blog
      </Title>
      {alert?.type === 'successful' && <Alert color="green">{alert.message}</Alert>}
      {alert?.type === 'error' && <Alert color="red">{alert.message}</Alert>}
      <Divider my={10} />
      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        <Paper>
          <Stack>
            {imageRender ? (
              <Image radius={"sm"} src={imageRender} alt={imageRender + "-MainBlogImage"} mah={300} />
            ) : (
              <Text bg={colorScheme === "dark" ? "dark" : "gray"} fz={24} p={30} ta={"center"}>
                No Image
              </Text>
            )}
            <FileInput
              accept="image/png,image/jpeg"
              mt={7}
              placeholder="Select a picture (jpg,png)"
              label="Image File"
              rightSection={<IconImageInPicture/>}
              onChange={e => {
                if (e) {
                  const imageURL = URL.createObjectURL(e);
                  setImageRender(imageURL);
                  setBlogImage(e)
                }
              }}
            />
          </Stack>
        </Paper>
        <Stack>
          <TextInput
            required
            placeholder="Blog Title"
            rightSection={<IconBook />}
            value={blog.title}
            onChange={(e)=> setBlog({
              title: e.currentTarget.value,
              content: blog.content,
              author: blog.author
            })}
          />

          <TextInput
            required
            placeholder="Blog Author"
            rightSection={<IconPencil />}
            onChange={(e)=> setBlog({
              title: blog.title,
              content: blog.content,
              author: e.currentTarget.value
            })}
          />

          <FileInput
            withAsterisk
            onClick={() => open()}
            placeholder="Content"
            rightSection={<IconNotebook />}
            style={{ cursor: "pointer" }}

          />

          <Modal
            opened={modalOpened}
            onClose={close}
            title="Content"
            size={"xl"}
            closeOnClickOutside={false}
          >

            <TextEditor content={blog.content} onSave={handleSaveContent} onReset={handleReset} />
          </Modal>
          <TagsInput
            placeholder="Blog Tags"
            data={[]}
            value={blogTags}
            onChange={setBlogTags}
          />
          <ButtonGroup>
            <Button variant={colorScheme === 'dark' ? 'light' : 'filled'} type="submit">Save</Button>
            <Button variant="default" type="reset">Reset</Button>
          </ButtonGroup>
        </Stack>
      </SimpleGrid>
    </form>

  );
};