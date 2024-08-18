import React from 'react';
import { Button, ButtonProps, useMantineColorScheme } from '@mantine/core';

interface IButton extends ButtonProps {
  children?: React.ReactNode,
  onClick?: React.ReactEventHandler<HTMLButtonElement>;
  component?: any
}

export const HeaderButton: React.FC<IButton> = ({ children, component, onClick, ...props }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Button component={component} variant={colorScheme === 'dark' ? 'light' : 'filled'} p={5} {...props} onClick={onClick}>
      {children}
    </Button>
  );
};