import { AppShell, Avatar, Box, Burger, Button, Container, DefaultMantineColor, Divider, Group, Menu, NavLink, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderButton } from './components/HeaderButton';
import { IconBook, IconBook2, IconChevronDown, IconHome, IconLogin2, IconLogout2, IconUserCircle, IconUserFilled } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import usePageLoading from './hooks/usePageLoading';
import LoadingBar from 'react-top-loading-bar';
import ToggleColorScheme from './components/ToggleColorScheme';

const navLinks: Array<{
  name: string,
  link: string,
  icon?: React.ReactNode,
  color?: DefaultMantineColor,
  iconRight?: React.ReactNode;
}> = [
    {
      name: "Home",
      link: "/home",
      icon: <IconHome />,
      color: "teal"
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <IconBook />
    }
  ];

const AccountLinks: Array<{
  label: string,
  link: string,
  icon: React.ReactNode;
}> = [
    {
      label: "Profile",
      icon: <IconUserCircle />,
      link: "/account/test"
    },
    {
      label: "Log Out",
      icon: <IconLogout2 />,
      link: '/logout',
    },
    {
      label: "Log In",
      icon: <IconLogin2 />,
      link: "Log In"
    },
    {
      label: "New Account",
      icon: <IconUserFilled />,
      link: "/register"
    }
  ];

const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
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
              <MantineLogo size={25} color={theme.primaryColor} cursor={"pointer"} onClick={() => navigate("/")} />
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
                  {
                    AccountLinks.map((link, i) => (
                      <Menu.Item
                        key={i}
                        leftSection={link.icon}
                        onClick={() => navigate(link.link)}
                      >
                        {link.label}
                      </Menu.Item>
                    ))
                  }
                  <Menu.Label>Manage</Menu.Label>
                  <Menu.Item
                    leftSection={<IconBook2 />}
                    component='a'
                    href='/panel'
                  >
                    Manage Blogs
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <ToggleColorScheme />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
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
          leftSection={<Avatar variant='transparent' size={30} />
          }
        >
          <Divider label='Account' />
          {AccountLinks.map((link, i) => (
            <NavLink
              key={i}
              variant={colorScheme === 'dark' ? 'light' : 'filled'}
              label={link.label}
              leftSection={link.icon}
              onClick={() => handleNavLink(link.link, i)}
              active={i === active}
              color='grape'
            />
          ))}

          <Box>
            <Divider label='Manage' />
            <NavLink
              label="Manage Blogs"
              leftSection={<IconBook />}
              component='a'
              href='/panel'
              active
              color='gray'
            />
          </Box>
        </NavLink>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container p={0}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;