import { Anchor, Divider, Image, SimpleGrid, Space, Title, useMantineTheme, Code, List, Text } from "@mantine/core";

export const useMdxComps = () => {
  const theme = useMantineTheme();

  return {
    h1: (props: any) => (
      <Title
        order={1}
        c={theme.primaryColor}
        {...props}
      />
    ),
    h2: (props: any) => (
      <Title
        order={2}
        c={theme.primaryColor}
        {...props}
      />
    ),
    h3: (props: any) => (
      <Title
        order={3}
        c={theme.primaryColor}
        {...props}
      />
    ),
    a: (props: any) => <Anchor {...props} />,
    hr: (props: any) => <Divider {...props} />,
    Space: (props: any) => <Space {...props} />,
    img: (props: any) => <Image {...props} width="100%" />,
    p: (props: any) => <Text fz={20} style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} {...props} />,
    ul: (props: any) => <List {...props}/>,
    li: (props: any) => <List.Item {...props}/>,
    code: (props: any) => <Code style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} {...props} />,
    SimpleGrid: (props: any) => <SimpleGrid cols={{ md: 2, sm: 1 }} {...props} />,
    Divider: (props: any) => <Divider {...props} />,
  };
};
