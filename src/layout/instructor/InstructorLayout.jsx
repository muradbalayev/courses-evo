import React from 'react'
import { Outlet } from 'react-router-dom'

const InstructorLayout = () => {
  return (
    <div className="instructor flex relative h-full overflow-x-hidden overflow-y-auto w-full">
      <Outlet/>
    </div>
  )
}

export default InstructorLayout
