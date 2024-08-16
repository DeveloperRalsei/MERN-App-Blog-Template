import { AppShell, Burger, Button, Container, Divider, Group, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ToggleColorScheme from "../../components/ToggleColorScheme";

const Panel = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" p={"md"}>
          <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
          <Title order={2}>Logo</Title>
          <Group>
            <ToggleColorScheme/>
          </Group>
        </Group>

      </AppShell.Header>
      <AppShell.Navbar py="md">
        <Divider label="Home Page" />
        <NavLink 
          label="Home Page"
          leftSection={<IconHome/>}
          component="a"
          href="/"
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export { UploadBlog } from './UploadBlog';
export default Panel;