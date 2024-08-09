import { AppShell, Avatar, Burger, DefaultMantineColor, Group, Popover, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderButton } from './components/HeaderButton';
import { IconBook, IconHome, IconMoon, IconSun } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';

const navLinks: Array<{
  name: string,
  link: string,
  icon?: React.ReactNode,
  color?: DefaultMantineColor
}> = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome />,
      color: "yellow"
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <IconBook />
    }
  ]


function App() {
  const [opened, { toggle }] = useDisclosure();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
  const navigate = useNavigate()
  const theme = useMantineTheme()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              {/* there will be Logo */}
              <Group ml={20} gap={5} visibleFrom="sm">
                {navLinks.map((navLink, i) => (
                  <HeaderButton
                    key={i}
                    leftSection={navLink.icon}
                    color={navLink.color}
                    onClick={() => navigate(navLink.link)}
                  >
                    {navLink.name}
                  </HeaderButton>
                ))}
              </Group>
            </Group>
            <Group>
              
              <HeaderButton onClick={toggleColorScheme} color={colorScheme === 'dark' ? "yellow" : 'blue'}>
                {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
              </HeaderButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">

      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App