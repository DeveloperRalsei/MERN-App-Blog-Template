import React from 'react'
import { Button, ButtonProps } from '@mantine/core'

interface IButton extends ButtonProps {
  children?: React.ReactNode,
  onClick?: React.ReactEventHandler<HTMLButtonElement>
}

export const HeaderButton: React.FC<IButton> = ({ children, onClick, ...props }) => {
  return (
    <Button variant='light' p={5} {...props} onClick={onClick}>
      {children}
    </Button>
  )
}