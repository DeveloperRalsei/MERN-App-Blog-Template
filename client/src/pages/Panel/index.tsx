import { AppShell, Box, Burger, Button, Container, Divider, Group, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure, useFullscreen } from "@mantine/hooks";
import { IconBook, IconDeviceDesktop, IconExternalLink, IconHome, IconWebhook } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import ToggleColorScheme from "../../components/ToggleColorScheme";
import { HeaderButton } from "../../components/HeaderButton";

const Panel = () => {
  const [opened, { toggle }] = useDisclosure();
  const fullscreen = useFullscreen();
  const navigate = useNavigate();

  const handleNavigate = (link: string, index?: number) => {
    navigate(link);
    toggle()
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
      footer={{ height: 30, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" p={"md"}>
          <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
          <Title order={2}>Panel</Title>
          <Group>
            <HeaderButton color="teal" onClick={fullscreen.toggle}>
              <IconDeviceDesktop />
            </HeaderButton>
            <ToggleColorScheme />
          </Group>
        </Group>

      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink
          label="Web Site"
          leftSection={<IconWebhook />}
          rightSection={<IconExternalLink size={15} />}
          component="a"
          href="/"
        />

        <Divider label="Home Page" />
        <NavLink
          label="Home Page"
          leftSection={<IconHome />}
          onClick={() => handleNavigate("/panel")}
        />

        <Divider label="Blogs" />
        <NavLink
          label={"List Blogs"}
          leftSection={<IconBook />}
          onClick={() => handleNavigate('blogs', 1)}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Group justify="space-around" align="start" h={"100%"} gap={7}>
          <div></div>
          <div></div>
          <div></div>
          <Box>
            Made by <Text
              component="a"
              href="http://developerRalsei.github.io"

              target="_blank"
            >Developer Ralsei</Text>
          </Box>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
};

export { UploadBlog } from './UploadBlog';
export default Panel;