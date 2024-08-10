import React from "react"
import { useParams } from "react-router-dom"

export const UserManagement: React.FC = () => {
  const { id } = useParams()

  

  return (
    <>User Managment Page {id}</>
  )
}