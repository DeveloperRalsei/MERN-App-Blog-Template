import React from 'react'
import { Button, ButtonProps, useMantineColorScheme} from '@mantine/core'

interface IButton extends ButtonProps {
  children?: React.ReactNode,
  onClick?: React.ReactEventHandler<HTMLButtonElement>
}

export const HeaderButton: React.FC<IButton> = ({ children, onClick, ...props }) => {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Button variant={colorScheme === 'dark' ? 'light' : 'filled'} p={5} {...props} onClick={onClick}>
      {children}
    </Button>
  )
}