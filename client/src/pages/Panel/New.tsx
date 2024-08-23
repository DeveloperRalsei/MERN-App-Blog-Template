import { Title, Divider, SimpleGrid, Paper, Stack, FileInput, TextInput, Modal, Image, TagsInput, ButtonGroup, Button, Text, useMantineColorScheme } from "@mantine/core";
import { IconBook, IconNotebook } from "@tabler/icons-react";
import TextEditor from "./panelComps/TextEditor";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export const Page = () => {
  const {colorScheme} = useMantineColorScheme()
  const [imageRender, setImageRender] = useState<string>("")
  const [modalOpened, {open, close}] = useDisclosure()
  const [blogTags, setBlogTags] = useState<string[]>([])

  const handleSaveContent = (content: string) => {
    console.log(content)
  }

  const handleReset = () => {
    
  }

  return (

    <form 
      
    >
      <Title order={3}>
        New Blog
      </Title>
      <Divider my={10} />
      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        <Paper>
          <Stack>
            {imageRender ? (
              <Image src={imageRender} alt={imageRender + "-MainBlogImage"} mah={300} />
            ) : (
              <Text bg={colorScheme === "dark" ? "dark" : "gray"} fz={24} p={30} ta={"center"}>
                No Image
              </Text>
            )}
            <FileInput
              accept="image/png,image/jpeg"
              mt={7}
              placeholder="Select a picture (jpg,png)"
              label="Image File" />
          </Stack>
        </Paper>
        <Stack>
          <TextInput
            withAsterisk
            label="Blog Title"
            rightSection={<IconBook />}
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
          >

            <TextEditor onSave={handleSaveContent} onReset={handleReset}/>
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

  )
}