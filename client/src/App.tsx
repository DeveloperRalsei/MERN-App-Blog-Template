import { AppShell, Avatar, Burger, DefaultMantineColor, Group, NavLink, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderButton } from './components/HeaderButton';
import { IconBook, IconHome, IconMoon, IconSun } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  const [active, setActive] = useState<number>(0)

  const handleNavLink = (navLink: string, index: number) => {
    navigate(navLink)
    setActive(index)
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
      }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <MantineLogo size={25}/>
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
              <Avatar
                radius={theme.defaultRadius}
                style={{ cursor: "pointer" }}
                // onClick={() => void}
              />
              <HeaderButton onClick={toggleColorScheme} color={colorScheme === 'dark' ? "yellow" : 'blue'}>
                {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
              </HeaderButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            variant='light'
            active={index === active}
            onClick={() => handleNavLink(navLink.link, index)}
          >

          </NavLink>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App