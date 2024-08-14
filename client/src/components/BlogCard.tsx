import { Card, Text, Stack, useMantineTheme, Image, Skeleton } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps{
  id: any,
  title: string,
  content: string,
  image?: React.ReactNode;
}

const BlogCard: React.FC<IProps> = ({ id, title, content, image }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate()

  return (
    <Card
      shadow="md"
      m={"auto"}
      w={"100%"}
      p={"md"}
      radius={theme.defaultRadius}
      style={{ boxShadow: "0 0 30px 0 rgba(0, 0, 0, .2), 0 0 1px 1px rgba(0, 0, 0, .2)" }}
      onClick={() => navigate(id)}
      maw={500}
    >
      <Stack>
        {image}
        <Text>{title}</Text>
        <Text>{content}</Text>
      </Stack>
    </Card>
  );
};

export default BlogCard;