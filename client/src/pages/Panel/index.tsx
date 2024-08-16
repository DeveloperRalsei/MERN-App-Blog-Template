import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

const Panel = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        Panel Home Page
      </AppShell.Header>
      
      <AppShell.Main>
        <Container>
          <Outlet/>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export { UploadBlog } from './UploadBlog';
export default Panel;