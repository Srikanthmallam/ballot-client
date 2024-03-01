import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layoout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Layoout
