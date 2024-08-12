import { Card, Text, Stack, useMantineTheme, Image, Skeleton } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: any,
  title: string,
  content: string,
  image?: string;
}

const BlogCard: React.FC<IProps> = ({ id, title, content, image }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate()

  return (
    <Card
      shadow="md"
      p={"md"}
      radius={theme.defaultRadius}
      style={{ boxShadow: "0 0 30px 0 rgba(0, 0, 0, .2), 0 0 1px 1px rgba(0, 0, 0, .2)" }}
      onClick={() => navigate(id)}
    >
      <Stack>
        {image ? (
          <Image
            src={image}
          />
        ) : <Skeleton w={"100%"}  h={175}/>}
        <Text>{title}</Text>
        <Text>{content}</Text>
      </Stack>
    </Card>
  );
};

export default BlogCard;