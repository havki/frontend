import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from '../AppBar/Appbar'


import ResponsiveDrawer from '../Drawer/Drawer'
import StickyFooter from '../Footer/Footer'

function Layout() {
  return (
    <>
    
    <ResponsiveDrawer/>
    {/* <ResponsiveAppBar/>
    <Outlet/>


    */}
    <StickyFooter/>
    </>
  )
}

export default Layout