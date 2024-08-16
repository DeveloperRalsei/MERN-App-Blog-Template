import { AppShell, Burger, Button, Container, Group, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

const Panel = () => {
  const [opened, { toggle }] = useDisclosure();
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
            <Button p={1}>test</Button>
          </Group>
        </Group>

      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink
          label="test"
        >
          <NavLink label="test" />
        </NavLink>
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