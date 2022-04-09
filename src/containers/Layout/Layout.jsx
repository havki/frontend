import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from '../AppBar/Appbar'


import ResponsiveDrawer from '../Drawer/Drawer'

function Layout() {
  return (
    <>
    
    <ResponsiveDrawer/>
    {/* <ResponsiveAppBar/>
    <Outlet/>
    */}
    </>
  )
}

export default Layout