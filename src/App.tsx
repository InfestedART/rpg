// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen/TitleScreen'
import NewChar from './pages/NewChar/NewChar'

function App() {
  return (
    <Routes>
      <Route path='*' element={<TitleScreen />} />
      <Route path='/newChar' element={<NewChar />} />
      {/*<Route path="*" element={<NotFound />} /> */}
    </Routes>    
  )
}

export default App
