// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import TitleScreen from './pages/TitleScreen/TitleScreen'
import NewChar from './pages/NewChar/NewChar'
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='*' element={<TitleScreen />} />
      <Route element={<Layout />}>
        <Route path='/newChar' element={<NewChar />} />
        {/*<Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>    
  )
}

export default App
