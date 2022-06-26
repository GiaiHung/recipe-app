import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from './Home'
import Cuisine from './Cuisine'
import SearchPage from './SearchPage'
import Recipe from './Recipe'

import { AnimatePresence } from 'framer-motion'

const Pages = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes Location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<SearchPage />} />
        <Route path='/recipe/:id' element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages
