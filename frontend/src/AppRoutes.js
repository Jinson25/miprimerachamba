import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePages from './pages/Home/HomePages'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePages/>} />
    </Routes>
  )
}
