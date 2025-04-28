import React from 'react'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <div className="relative h-full w-full">
      <Outlet/>
    </div>
  )
}

export default ClientLayout
