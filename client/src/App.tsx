import { AppShell, Avatar, Box, Burger, Button, Container, DefaultMantineColor, Divider, Group, Menu, NavLink, Progress, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderButton } from './components/HeaderButton';
import { IconBook, IconBook2, IconChevronDown, IconChevronRight, IconHome, IconLogin2, IconLogout2, IconMoon, IconSun, IconUserCircle, IconUserFilled } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import usePageLoading from './hooks/usePageLoading';
import LoadingBar from 'react-top-loading-bar';

const navLinks: Array<{
  name: string,
  link: string,
  icon?: React.ReactNode,
  color?: DefaultMantineColor,
  iconRight?: React.ReactNode;
}> = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome />,
      color: "teal"
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <IconBook />
    }
  ];


const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [active, setActive] = useState<number>(0);
  const ref = usePageLoading();

  const handleNavLink = (navLink: string, index: number) => {
    navigate(navLink);
    setActive(index);
    toggle();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <LoadingBar
        ref={ref}
        color={theme.primaryColor}
        height={5}
        style={{ borderRadius: "0 10px 10px 0" }}
        waitingTime={100}
      />
      <AppShell.Header style={{
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      }}
      >
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <MantineLogo size={25} color={theme.primaryColor} />
              <Group ml={20} gap={5} visibleFrom="sm">
                {navLinks.map((navLink, i) => (
                  <HeaderButton
                    key={i}
                    leftSection={navLink.icon}
                    color={navLink.color}
                    variant={colorScheme === 'dark' ? 'light' : 'filled'}
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
                  <Button visibleFrom='sm' px={0} variant={colorScheme === 'dark' ? 'light' : 'filled'} radius={theme.defaultRadius}>
                    <Avatar variant='transparent' color='white' />
                    <IconChevronDown size={14} />
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
                  <Menu.Label>Manage</Menu.Label>
                  <Menu.Item
                    leftSection={<IconBook2 />}
                    onClick={() => navigate('/panel')}
                  >
                    Manage Blogs
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

      <AppShell.Navbar p={"md"}>
        <AppShell.Section>
          {navLinks.map((navLink, index) => (
            <NavLink
              key={index}
              variant={colorScheme === 'dark' ? 'light' : 'filled'}
              label={navLink.name}
              color={navLink.color}
              active={index === active}
              leftSection={navLink.icon}
              onClick={() => handleNavLink(navLink.link, index)}
            />
          ))}
        </AppShell.Section>
        <NavLink
          variant={colorScheme === 'dark' ? 'light' : 'filled'}
          label={"Account"}
          color={"teal"}
          rightSection={<IconChevronRight size={14} />}
          leftSection={<Avatar variant='transparent' />}
          mb={3}
        >

          <NavLink
            label="Profile"
            leftSection={<IconUserCircle />}
          />
          <Divider label='test'/>
          <NavLink
            label="Profile"
            leftSection={<IconUserCircle />}
          />
        </NavLink>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size={"md"}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;