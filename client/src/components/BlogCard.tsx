import { Card, Text, Stack, useMantineTheme, Image, Group, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ObjectId } from 'mongoose';

interface IProps{
  id: ObjectId | any,
  title: string,
  content: string,
  image?: string;
}

const BlogCard: React.FC<IProps> = ({ id, title, content, image }) => {
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme()
  console.log(image)

  return (
    <Card
      shadow="md"
      m={"auto"}
      w={"100%"}
      p={"md"}
      radius={theme.defaultRadius}
      component={Link}
      to={id}
      maw={500}
    >
      <Stack>
        {image ? (
          <Image src={image} w={"100%"} alt={`image-${title}-${id}`} />
        ) : (
          <Group  h={175} w={"100%"} align='center' justify='center' bg={colorScheme === 'dark' ? 'dark' : theme.colors.dark[0]}>
            <Text fz={23}>No Image</Text>
          </Group>
        )}
        <Text>{title}</Text>
        <Text>{content}</Text>
      </Stack>
    </Card>
  );
};

export default BlogCard;