import { AppShell, Avatar, Burger, Button, Container, DefaultMantineColor, Group, Menu, NavLink, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderButton } from './components/HeaderButton';
import { IconBook, IconChevronDown, IconChevronRight, IconHome, IconLogin2, IconLogout2, IconMoon, IconSun, IconUserCircle, IconUserFilled } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const navLinks: Array<{
  name: string,
  link: string,
  icon?: React.ReactNode,
  color?: DefaultMantineColor,
  iconRight?: React.ReactNode
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
    toggle()
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        boxShadow: "0 10px 30px 0 rgba(0, 0, 0, .1)"
      }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <MantineLogo size={25} />
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
              <Menu>
                <Menu.Target>
                  <Button px={0} variant={colorScheme === 'dark' ? 'light' : 'filled'} radius={theme.defaultRadius}>
                    <Avatar variant='transparent' color='white'/>
                    <IconChevronDown size={14}/>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item
                    leftSection={<IconUserCircle />}
                    onClick={() => navigate("/account/:id")}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout2 />}
                    onClick={() => navigate('/logout')}
                  >
                    Log Out
                  </Menu.Item>
                  <Menu.Label>Manage</Menu.Label>
                  <Menu.Item
                    leftSection={<IconLogin2 />}
                    onClick={() => navigate('/login')}
                  >
                    Log In
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconUserFilled />}
                    onClick={() => navigate('/register')}
                  >
                    New Account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <HeaderButton onClick={toggleColorScheme} color={colorScheme === 'dark' ? "yellow" : 'blue'}>
                {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
              </HeaderButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            variant={colorScheme === 'dark' ? 'light' : 'filled'}
            label={navLink.name}
            color={navLink.color}
            active={index === active}
            rightSection={<IconChevronRight size={14} />}
            leftSection={navLink.icon}
            onClick={() => handleNavLink(navLink.link, index)}
            mb={3}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size={"md"}>
          <Outlet />
          {/* {!blogs ? "loading..." : blogs} */}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App