import { Anchor, Divider, Image, SimpleGrid, Space, Title, useMantineTheme, useMantineColorScheme, Code } from "@mantine/core";

export const useMdxComps = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return {
    h1: (props: any) => (
      <Title
        order={1}
        mb={15}
        c={theme.primaryColor}
        {...props}
      />
    ),
    h2: (props: any) => (
      <Title
        order={2}
        mb={15}
        c={theme.primaryColor}
        {...props}
      />
    ),
    h3: (props: any) => (
      <Title
        order={3}
        mb={15}
        c={theme.primaryColor}
        {...props}
      />
    ),
    a: (props: any) => <Anchor {...props} />,
    hr: (props: any) => <Divider {...props} />,
    Space: (props: any) => <Space {...props} />,
    img: (props: any) => <Image {...props} width="100%" />,
    p: (props: any) => <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} {...props} />,
    code: (props: any) => <Code style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} {...props} />,
    SimpleGrid: (props: any) => <SimpleGrid cols={{ md: 2, sm: 1 }} {...props} />,
    Divider: (props: any) => <Divider {...props} />,
  };
};
