// editpage.tsx
import { Box, Button, ButtonGroup, Divider, FileInput, Image, Loader, Modal, Paper, SimpleGrid, Stack, TagsInput, Text, TextInput, Title, useMantineColorScheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Blog } from "../../types";
import blogRoutes from "../../routes/blogRoutes";
import { useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import TextEditor from "./panelComps/TextEditor";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconNotebook } from "@tabler/icons-react";
import { nprogress } from "@mantine/nprogress";

export const Page = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpened, { close, open }] = useDisclosure();
  const [imageRender, setImageRender] = useState<string | null>(null);
  const [blogImage, setBlogImage] = useState<string | null>(null);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogContent, setBlogContent] = useState<string>("");
  const { colorScheme } = useMantineColorScheme();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
      image: "",
      tags: [],
    } as {
      title: string,
      content: string,
      image?: string,
      tags: string[];
    }
  });

  useEffect(() => {
    async function loadBlog() {
      nprogress.start();
      try {
        setIsLoading(true);
        const response = await blogRoutes.getBlogById(blogId);
        const data = response.data.data[0];
        setBlog(data);
        setImageRender(data.image);
        setBlogTags(data.tags);
        setBlogContent(data.content);
        nprogress.complete();
      } catch (error) {
        setIsLoading(false);
        console.error(error as string);
        nprogress.reset();
      } finally {
        setIsLoading(false);
        nprogress.complete();
      }
    }

    loadBlog();
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      form.setFieldValue("title", blog.title);
      form.setFieldValue("content", blogContent);
      form.setFieldValue("tags", blogTags);
      form.setFieldValue("image", blogImage as string);
    }
  }, [blog, form, blogTags, blogImage, blogContent]);

  const handleSaveContent = (content: string) => {
    setBlogContent(content);
  };

  const handleResetContent = () => {
    form.setFieldValue("content", blog?.content || "")
  };

  if (isLoading || !blog) return <Loader />;

  return (
    <form onSubmit={form.onSubmit(values => console.log(values))}>
      <Title order={3}>
        Editing {'"' + blog?.title + '"'}
      </Title>
      <Divider my={10} />
      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        <Paper>
          <Stack>
            {imageRender ? (
              <Image src={imageRender} alt={blog?._id + "-MainBlogImage"} mah={300} />
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
              onChange={e => {
                if (e) {
                  const imgageUrl = URL.createObjectURL(e);
                  setImageRender(imgageUrl);
                  setBlogImage(e.name);
                }
              }} />
          </Stack>
        </Paper>
        <Stack>
          <TextInput
            withAsterisk
            label="Blog Title"
            rightSection={<IconBook />}
            {...form.getInputProps("title")}
          />

          <FileInput
            label="Content"
            onClick={() => open()}
            placeholder="Change Content"
            rightSection={<IconNotebook />}
            style={{ cursor: "pointer" }}
            value={null}
          />

          <Modal
            opened={modalOpened}
            onClose={close}
            title="Content"
            size={"xl"}
          >
            <TextEditor
              content={blogContent}
              onSave={handleSaveContent}
              onReset={handleResetContent}
            />

          </Modal>
          <TagsInput
            label="Blog Tags"
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
