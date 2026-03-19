import './App.css'
import { Routes, Route } from 'react-router-dom';

import TitleScreen from './pages/TitleScreen/TitleScreen'
import NewChar from './pages/NewChar/NewChar'
import LoadChar from './pages/LoadChar';
import Game from './pages/Game';

import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='*' element={<TitleScreen />} />
      <Route element={<Layout />}>
        <Route path='/newChar' element={<NewChar />} />
        <Route path='/loadChar' element={<LoadChar />} />
        <Route path='/game' element={<Game />} />
        {/*<Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>    
  )
}

export default App
