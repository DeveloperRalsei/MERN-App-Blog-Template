import React from "react"
import { useParams } from "react-router-dom"

export const UserManagement: React.FC = () => {
  const { accountId } = useParams()

  if(!accountId){
    return (
      <>We're sorry but we couldn't find a profile account</>
    )
  }
  

  return (
    <>User Managment Page {accountId}</>
  )
}