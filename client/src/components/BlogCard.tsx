import { Card, Text, Stack, useMantineTheme, Image, Group, useMantineColorScheme, Pill, PillGroup } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types';

interface IProps extends Blog { }

const BlogCard: React.FC<IProps> = ({ _id, title, image, author, tags }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Card
      shadow="md"
      m={"auto"}
      w={"100%"}
      p={"md"}
      radius={theme.defaultRadius}
      maw={500}
    >
      <Stack
      >
        {image ? (
          <Image
            src={image}
            mah={200}
            bgp={"center"}
            w={"100%"}
          />
        ) : (
          <Group
            h={200}
            w={"100%"}
            align='center'
            justify='center'
            bg={colorScheme === 'dark' ? 'dark' : theme.colors.dark[0]}
          >
            <Text fz={23}>No Image</Text>
          </Group>
        )}
        <Text
          fz={27}
          c={theme.primaryColor}
          component={Link}
          to={_id}
        >{title}</Text>
        <Group w={"100%"} align='center' justify='space-between'>
          <Text>Author: {author}</Text>
          <PillGroup>
            {tags?.map((tag,i) => (
              <Pill key={i}>
                {tag}
              </Pill>
            ))}
          </PillGroup>
        </Group>
      </Stack>
    </Card>
  );
};

export default BlogCard;